Whoo: Nice git.

Why - it works
1.首先这个很重要，是我每天都会用到的东东
2.通过这个能管理老婆
3.利用这个可以和老婆一起学习 booster 解决
4.带领老婆build future together

What
v0.1.0
1.输入 Name + Passowrd 就能进入房间 -> what do you want to focus on?-> Join Room
2.Chat Room 显示:  Jason Joined the room, I will focus on:
3.Raise your hand if you are ready. Ready, => 然后此时变成Pomorodo
4.Jason is ready to start 25 mins journey with you.
5.Cathy is ready...
6.两边同时开始计时

Tech Stack:
Front: React Redux
Back: Firebase or NodeJS???


Do
>:一定需要添加Firebase的，不然chat messages无法做到同步
?: Pomodoro时间怎么同步? 肯定需要在Firebase做一个 timestamp
?: Github 这次需要做到教学水平，怎么去安排?


[I am ready] ->
[I am ready] -> readyCount

if readyCount == 2: 开始count;

1个page, 2个Components

### V0.1.0 - a private room for two users to share the same pomodoro
- [x] 1.Init react project
- [x] 2.Add redux reducers
- [ ] 3.Type username and what to focus to join room
