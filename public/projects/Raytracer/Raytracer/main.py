# raytracerMain.py: Create a scene and pygame window and do the render operation
try:        reload(math3d)
except:     import math3d
try:        reload(materials)
except:     import materials
try:        reload(objects3d)
except:     import objects3d
try:        reload(raytracer)
except:     import raytracer

import pygame

SceneType = raw_input("1 for Mirrors, 2 for Refractions, 3 for Texture Mapping, 4 for Normal: ")
screenWidth = raw_input("Enter the width of the screen you wish to view in: ")
SceneType=int(SceneType)
screenWidth=int(screenWidth)
screenHeight=screenWidth/2

#initializations
pygame.display.init()
screen = pygame.display.set_mode((screenWidth,screenHeight))
renderSurf = pygame.Surface((screenWidth,screenHeight)).convert()
done = False

#create a scene
SCENE = raytracer.scene(renderSurf)
SCENE.updateCamera(math3d.Vector3(20,10,50),      # cameraPos
                   math3d.Vector3(10,7,0),       # cameraCOI
                   math3d.Vector3(0,15,0))       # cameraUp

#create some materials
redMat = materials.SolidColor(math3d.Vector3(0,0,0),math3d.Vector3(1,0,0),\
                              math3d.Vector3(1,0,0),30)
greenMat = materials.SolidColor(math3d.Vector3(0,0,0),math3d.Vector3(0,1,0),\
                              math3d.Vector3(.9,1,.9),30)
blueMat = materials.SolidColor(math3d.Vector3(0,0,.2),math3d.Vector3(0,0,1),\
                              math3d.Vector3(0,0,1),50)
whiteMat = materials.SolidColor(math3d.Vector3(0,0,0),math3d.Vector3(.5,.5,.5),\
                              math3d.Vector3(.6,.6,.6),30)
oMat = materials.SolidColor(math3d.Vector3(0,0,0),math3d.Vector3(0,.7,.7),\
                              math3d.Vector3(0,.9,.9),6)
whiteClearMat = materials.SolidColor(math3d.Vector3(.5,.5,.5),math3d.Vector3(.5,.5,.5),\
                              math3d.Vector3(.5,.5,.5),50,.6,0,1.05)
whiteMirrorMat = materials.SolidColor(math3d.Vector3(1,1,1),math3d.Vector3(1,1,1),\
                              math3d.Vector3(1,1,1),50,0,.9)
EarthMat = materials.SolidColor(math3d.Vector3(0,0,0),math3d.Vector3(.5,.5,.5),\
                              math3d.Vector3(.7,.7,.7),50,0,0,1, "earth.bmp")
#create lights
whiteLit = objects3d.Light(math3d.Vector3(20,50,-10),math3d.Vector3(1,1,1))

#create some objects
redBall = objects3d.Sphere(math3d.Vector3(0,0,0), 14.0, redMat)
greenPlane = objects3d.Plane(math3d.Vector3(0,1,0), -0.0001, greenMat, whiteMat)
blueBall = objects3d.Sphere(math3d.Vector3(-10,0,50), 15, blueMat)
blueBall2 = objects3d.Sphere(math3d.Vector3(5,5,-25), 20, blueMat)
cyanBlender = objects3d.TriMesh("cube.obj", oMat)
whiteClearBall = objects3d.Sphere(math3d.Vector3(0,20,5), 17, whiteClearMat)
mirrorS = objects3d.Sphere(math3d.Vector3(-35,20,-10), 15.0, whiteMirrorMat)
mirror = objects3d.TriMesh("mirror2.obj", whiteMirrorMat)
earth = objects3d.Sphere(math3d.Vector3(0,18,-12), 18, EarthMat)

SCENE.addObject(greenPlane)

if SceneType==1:
    SCENE.addObject(mirror)
    SCENE.addObject(mirrorS)
    SCENE.addObject(blueBall)
    SCENE.addObject(redBall)
elif SceneType==2:
    SCENE.addObject(whiteClearBall)
    SCENE.addObject(blueBall2)
    SCENE.addObject(mirror)
elif SceneType==3:
    SCENE.addObject(earth)
    SCENE.addObject(mirror)
else:
    SCENE.addObject(redBall)
    SCENE.addObject(cyanBlender)

SCENE.addLight(whiteLit)

curY = 0
up = 10
x = 10
y = 7
cx = 20
cy = 15
cz = 50

#Game Loop
while not done:
    #Erase
    screen.fill((0,0,0))

    # Get input
    pygame.event.pump()
    pressedList = pygame.key.get_pressed()
    if pressedList[pygame.K_ESCAPE]:
        done = True
    if pressedList[pygame.K_UP]:
        up+=2
        curY = 0
        SCENE.updateCamera(math3d.Vector3(cx,cy,cz),      # cameraPos
                   math3d.Vector3(x,y,0),       # cameraCOI
                   math3d.Vector3(0,up,0))       # cameraUp
    if pressedList[pygame.K_DOWN]:
        up-=2
        curY = 0
        SCENE.updateCamera(math3d.Vector3(cx,cy,cz),      # cameraPos
                   math3d.Vector3(x,y,0),       # cameraCOI
                   math3d.Vector3(0,up,0))       # cameraUp
    if pressedList[pygame.K_LEFT]:
        x-=1
        curY = 0
        SCENE.updateCamera(math3d.Vector3(cx,cy,cz),      # cameraPos
                   math3d.Vector3(x,y,0),       # cameraCOI
                   math3d.Vector3(0,up,0))       # cameraUp
    if pressedList[pygame.K_RIGHT]:
        x+=1
        curY = 0
        SCENE.updateCamera(math3d.Vector3(cx,cy,cz),      # cameraPos
                   math3d.Vector3(x,y,0),       # cameraCOI
                   math3d.Vector3(0,up,0))       # cameraUp
    if pressedList[pygame.K_1]:     #zoom in
        cx-=1
        cy-=1
        cz-=1
        curY = 0
        SCENE.updateCamera(math3d.Vector3(cx,cy,cz),      # cameraPos
                   math3d.Vector3(x,y,0),       # cameraCOI
                   math3d.Vector3(0,up,0))       # cameraUp
    if pressedList[pygame.K_2]:     #zoom out
        cx+=1
        cy+=1
        cz+=1
        curY = 0
        SCENE.updateCamera(math3d.Vector3(cx,cy,cz),      # cameraPos
                   math3d.Vector3(x,y,0),       # cameraCOI
                   math3d.Vector3(0,up,0))       # cameraUp

    #Update variables
    if curY < screenWidth:
        SCENE.renderOneLine(curY)
        curY += 1

    # Draw
    screen.blit(renderSurf, (0,0))
    pygame.display.flip()

#shut down
pygame.display.quit()
