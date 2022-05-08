# crawler-light
A dungeon crawler experiment.

# Maps
are auto-generated on a grid using the "drunken walk" method. See makeMaze().


#Enemies 
Enemies are run on state machine system. Units move from one state to the next when animations are complete.
In order to function properly, most enemies should have a walking animation, a "tell" animation and an attack animation. Both tell and attack
animations should have a finite number of repetitions.