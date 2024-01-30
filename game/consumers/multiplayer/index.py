from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from django.core.cache import cache

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = None
        for i in range(1000):
            name = "room-%d" % (i)
            if not cache.has_key(name) or len(cache.get(name)) < settings.ROOM_CAPACITY:
                self.room_name = name
                break
        #  房间满了，不要再新建房间了
        if not self.room_name: return

        await self.accept()

        #  如果房间是新建的，要在redis里创建出来
        if not cache.has_key(self.room_name):
            cache.set(self.room_name, [], 3600)  # 有效期1小时
        
        #  遍历当前已有玩家
        for player in cache.get(self.room_name):
            await self.send(text_data = json.dumps({
                "event": "create_player",
                "uuid": player["uuid"],
                "username": player["username"],
                "photo": player["photo"],
                }))

        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def create_player(self, data):
        #  从redis中找出当前对局中的所有玩家
        players = cache.get(self.room_name)
        players.append({
            "uuid": data["uuid"],
            "username": data["username"],
            "photo": data["photo"],
            })
        cache.set(self.room_name, players, 3600)
        #  服务器向所有玩家广播
        await self.channel_layer.group_send(
                self.room_name,
                {"type": "group_send_event", #  每个玩家接收广播的函数名
                 "event": "create_player",
                 "uuid": data["uuid"],
                 "username": data["username"],
                 "photo": data["photo"],
                }
        )

    #  每个玩家接收广播的函数
    async def group_send_event(self, data):
        #  将信息发送到前端
        await self.send(text_data = json.dumps(data))

    async def move_to(self, data):
        await self.channel_layer.group_send(
                self.room_name,
                {"type": "group_send_event",
                 "event": "move_to",
                 "uuid": data["uuid"],
                 "tx": data["tx"],
                 "ty": data["ty"],
                }
        )


    async def receive(self, text_data):
        data = json.loads(text_data)
        event = data['event']
        if event == "create_player":
            await self.create_player(data)
        elif event == "move_to":
            await self.move_to(data)

