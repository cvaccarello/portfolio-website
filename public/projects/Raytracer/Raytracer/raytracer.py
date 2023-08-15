import pygame
##import visual
import math
try:    reload(math3d)
except:     import math3d
try:    reload(objects3d)
except:     import objects3d

class scene(object):
    def __init__(self,surface):
        self.surface = surface              #what appears on the screen
        self.pWidth = surface.get_width()   #width of screen
        self.pHeight = surface.get_height() #height of screen
        self.cameraPos = math3d.Vector3(20,30,50)  #where the camera is
        self.cameraCOI = math3d.Vector3(0,0,0)     #center of interest
        self.cameraUp = math3d.Vector3(0,1,0)      #up distance of camera
        self.FOV = 30                   #angle from center out to edge (L & R)
        self.aspectRatio = self.pWidth/self.pHeight
        self.near = 1.0                     #distance from camera to screen
        self.olist = []
        self.Llist = []
        self.Ia = math3d.Vector3(1,1,1)
    def updateCamera(self, newCameraPos, newCameraCOI, newCameraUp):
        self.cameraPos = newCameraPos
        self.cameraUp = newCameraUp
        self.cameraCOI = newCameraCOI
        self.cameraPos+=self.cameraUp

        camDir = self.cameraPos - self.cameraCOI
        camDirNorm = camDir.normalizeCopy()

        self.camZaxis = camDirNorm
        camXaxis = self.cameraUp.crossProduct(self.camZaxis)
        self.camXaxis = camXaxis.normalizeCopy()

        camYaxis = self.camZaxis.crossProduct(camXaxis)
        self.camYaxis = camYaxis.normalizeCopy()

        self.A = self.cameraPos - self.camZaxis*self.near     #center dot

        self.ydist = math.tan(math.radians(self.FOV))*self.near
        self.xdist = self.ydist*self.aspectRatio
        self.TX = (2*self.xdist)/self.pWidth
        self.TY = (2*self.ydist)/self.pHeight

        self.topLeft = self.A+(self.camYaxis*self.ydist)-(self.camXaxis*self.xdist)
    def updateVPython(self):
        self.surface = surface              #what appears on the screen
        self.pWidth = surface.get_width()   #width of screen
        self.pHeight = surface.get_height() #height of screen
        self.FOV = newFOV                   #angle from center out to edge (L & R)
        self.aspectRatio = self.pWidth/self.pHeight
        self.near = newNear                     #distance from camera to screen
        updateCamera(self.cameraPos, self.cameraCOI, self.cameraUp)
        createVPython()

    def addObject(self, o):
        self.olist.append(o)

    def addLight(self, l):
        self.Llist.append(l)

    def getPixelPos(self,px,py):
        #return our 3D position (Vector3) of this pixel
        return self.topLeft + (px*self.TX * self.camXaxis) - (py*self.TY * self.camYaxis)

    def renderOneLine(self,py):
        curPos = self.getPixelPos(0,py)
        for i in range(self.pWidth):
            Pos1 = self.getPixelPos(i,py-.4)
            Pos2 = self.getPixelPos(i,py+.4)
            Pos3 = self.getPixelPos(i-.4,py)
            Pos4 = self.getPixelPos(i+.4,py)
            R = objects3d.Ray(curPos, curPos-self.cameraPos)    #center
            R1 = objects3d.Ray(Pos1, Pos1-self.cameraPos)
            R2 = objects3d.Ray(Pos2, Pos2-self.cameraPos)
            R3 = objects3d.Ray(Pos3, Pos3-self.cameraPos)
            R4 = objects3d.Ray(Pos4, Pos4-self.cameraPos)
            colorVect = self.castRay(R)
            colorVect1 = self.castRay(R1)
            colorVect2 = self.castRay(R2)
            colorVect3 = self.castRay(R3)
            colorVect4 = self.castRay(R4)

            x = (colorVect.x+colorVect1.x+colorVect2.x+colorVect3.x+colorVect4.x)/5
            y = (colorVect.y+colorVect1.y+colorVect2.y+colorVect3.y+colorVect4.y)/5
            z = (colorVect.z+colorVect1.z+colorVect2.z+colorVect3.z+colorVect4.z)/5
            colorVect = math3d.Vector3(x,y,z)

            self.surface.set_at((i,py),(colorVect.x*255,
                                           colorVect.y*255,
                                           colorVect.z*255))
            curPos += self.TX*self.camXaxis
            

##        curPos = self.getPixelPos(0,py)
##        for i in range(self.pWidth):
##            R = objects3d.Ray(curPos, curPos-self.cameraPos)
##            colorVect = self.castRay(R)
##            self.surface.set_at((i,py),(colorVect.x*255,
##                                           colorVect.y*255,
##                                           colorVect.z*255))
##            curPos += self.TX*self.camXaxis

    def castRay(self,R, islttest=False, ignoreObj=None):
        #Find the closes object hit, if any
        closestHit = None
        for o in self.olist:
            if o == ignoreObj:
                continue
            testHit = o.hit(R)
            if testHit != None and (closestHit==None or
                                    testHit.dist<closestHit.dist):
                closestHit = testHit
        if closestHit == None:
            if islttest:
                return None
            else:
                return math3d.Vector3(.5,.5,.5)
        else:
            if islttest:
                return closestHit
            else:
                return self.litColor(closestHit,R)

    def litColor(self,hitData,R):
        diffuseTotal = math3d.Vector3(0,0,0)
        specTotal = math3d.Vector3(0,0,0)
        hitPt = R.getPt(hitData.dist)

        hitColor = math3d.Vector3(0,0,0)
        mirrorStrength = hitData.material.getColor(hitPt)[5]
        if hitData.material.getColor(hitPt)[5] > 0:  #if material is mirror object
            mirrorR = 2*((-1.0*R.d).dot(hitData.normal)*hitData.normal) - (-1.0*R.d)
            mirrorR = objects3d.Ray(hitPt, mirrorR)
            mirrorR.o += 0.01*mirrorR.d
            hitColor = self.castRay(mirrorR,False,hitData.object) #color reflected off of mirror

        hitColor2 = math3d.Vector3(0,0,0)
        transparencyStrength = hitData.material.getColor(hitPt)[4]
        rIndex = hitData.material.getColor(hitPt)[6]
        if rIndex > 1:
            n = (hitData.normal).dot(hitData.normal)
            e = (-1.0*R.d).dot(hitData.normal)
            e *= 1.0/rIndex
            transparentR = (hitData.normal*e) - (-1.0*R.d*n*5)
            transparentR = objects3d.Ray(hitPt, transparentR)
            transparentR.o += 0.01*transparentR.d
            hitColor2 = self.castRay(transparentR,False,hitData.object)

        image = hitData.material.getColor(hitPt)[7]
        imageColor = math3d.Vector3(0,0,0)
        if image!=None:
            tu = (math.asin(hitData.normal.x)/math.pi + 0.5)*(image.get_width()-300)-150
            tv = (math.asin(-hitData.normal.y)/math.pi + 0.5)*image.get_height()
            if tu<0:
                tu+=image.get_width()
            if tv<0:
                tv+=image.get_height()
            colorkey = image.get_at((tu,tv))
            imageColor = math3d.Vector3(colorkey[0]/float(255),colorkey[1]/float(255),colorkey[2]/float(255))
    
        for L in self.Llist:
            Ka = hitData.material.getColor(hitPt)[0]
            Kd = hitData.material.getColor(hitPt)[1]
            Ks = hitData.material.getColor(hitPt)[2]
            Shininess = hitData.material.getColor(hitPt)[3]
            LDir = (L.pos-hitPt).normalizeCopy()     #Light Direction
            Id = LDir.dot(hitData.normal)   #intensity of diffuse light (0-1)
            V = (self.cameraPos - hitPt).normalizeCopy()
            Ra = 2*(LDir.dot(hitData.normal)*hitData.normal) - LDir
            
            Is = V.dot(Ra)
            if Id < 0:
                Id = 0
            if Is < 0 or Id < 0:
                Is = 0
            else:
                Is = Is**Shininess

            shadowR = objects3d.Ray(L.pos, hitPt-L.pos)
            testHit = self.castRay(shadowR,True)
            if testHit != None:
                obj1 = testHit.object
                obj2 = hitData.object
                if obj1 == obj2:
                    diffuseTotal += math3d.Vector3(Kd.x * L.color.x * Id, \
                                     Kd.y * L.color.y * Id, \
                                     Kd.z * L.color.z * Id)
                    specTotal += math3d.Vector3(Ks.x * L.color.x * Is, \
                                  Ks.y * L.color.y * Is, \
                                  Ks.z * L.color.z * Is)
                else:
                    tHitPt = shadowR.getPt(testHit.dist)
                    shadowMultiplier = testHit.material.getColor(tHitPt)[4]
                    if shadowMultiplier < .3:
                        shadowMultiplier = .3
                    if shadowMultiplier > 1:
                        shadowMultiplier = 1
                    diffuseTotal += math3d.Vector3(Kd.x * L.color.x * Id, \
                                     Kd.y * L.color.y * Id, \
                                     Kd.z * L.color.z * Id)*shadowMultiplier
                    specTotal += math3d.Vector3(Ks.x * L.color.x * Is, \
                                  Ks.y * L.color.y * Is, \
                                  Ks.z * L.color.z * Is)*shadowMultiplier

        ambientTotal = math3d.Vector3(Ka.x * self.Ia.x,\
                                      Ka.y * self.Ia.y,\
                                      Ka.z * self.Ia.z)#long equation

        litTotal = (1.0-transparencyStrength)*(1.0-mirrorStrength)* \
                   (ambientTotal + diffuseTotal + specTotal) + \
                   (hitColor*mirrorStrength) + (hitColor2*transparencyStrength) + (imageColor*.6)

        if litTotal.x > 1:
            litTotal.x = 1
        if litTotal.y > 1:
            litTotal.y = 1
        if litTotal.z > 1:
            litTotal.z = 1
        return litTotal
