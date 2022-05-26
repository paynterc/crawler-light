# crawler-light
A dungeon crawler experiment.

# Maps
are auto-generated on a grid using the "drunken walk" method. See makeMaze().


# Enemies 
Enemies are run on state machine system. Units move from one state to the next when animations are complete.
In order to function properly, most enemies should have a walking animation, a "tell" animation and an attack animation. Both tell and attack
animations should have a finite number of repetitions.

# Missions
Missions are granted and completed through the NPC interact() method. An initial array of mission objects is set in the bootScene.
Each mission has status variables (started, completed), an associated NPC, text and items required for completion. Some missions are "random" 
in that they can be granted by random encounters in the wild. Non-random missions are reserved for specific events like boss fights.