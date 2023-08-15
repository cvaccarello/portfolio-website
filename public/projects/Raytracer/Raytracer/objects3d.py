#objects3d.py:  mathematical descriptions of 3d objects
try:    reload(math3d)
except: import math3d
import math

class Light(object):
    def __init__(self,pos,color):
        self.pos = pos
        self.color = color

class Ray(object):
    def __init__(self, origin, direction):
        if not isinstance(origin, math3d.Vector3) or \
           not isinstance(direction, math3d.Vector3):
            raise ValueError("origin and direction must both be Vector3 objects.")
        self.o = origin
        self.d = direction.normalizeCopy()
    def getPt(self, dist):
        return self.o + dist * self.d

class HitData(object):
    def __init__(self,d,N,mat,obj):
        self.dist = d
        self.normal = N
        self.material = mat
        self.object = obj

class TriMesh(object):
    def __init__(self,fnam,material):
        self.material = material
        self.triList = []       #holds groups of 3 points
        plist = []

        try:
            fp = open(fnam, "r")
            for line in fp:
                if line[0] == 'v':
                    items = line.split(' ')
                    newPoint = math3d.Vector3(items[1],items[2],items[3])*5
                    plist.append(newPoint)
                if line[0] == 'f':
                    items = line.split(' ')
                    temp1 = int(items[1])-1
                    temp2 = int(items[2])-1
                    temp3 = int(items[3])-1
                    self.triList.append(Triangle(plist[temp1],plist[temp2],plist[temp3],material))
            fp.flush()
            fp.close()
        except IOError:
            print "Could not open file..."
            
    def hit(self, R):
        closestTri = None
        for T in self.triList:
            testHit = T.hit(R)
            if testHit != None:
                distance = testHit.dist
                if closestTri == None:
                    closestTri = testHit
                elif distance < closestTri.dist:
                    closestTri = testHit
        return closestTri

class Triangle(object):
    def __init__(self,p1,p2,p3,material):
        self.p1 = p1
        self.p2 = p2
        self.p3 = p3
        tempV = self.p2-self.p1
        tempW = self.p3-self.p1
        self.normal = tempV.crossProduct(tempW).normalizeCopy()
        self.d = self.p1.dot(self.normal)
        self.material = material
        self.Plane = Plane(self.normal, self.d, self.material, self.material)
    def hit(self, R):
        testHit = self.Plane.hit(R)
        if testHit == None:
            return None
        else:
            hitPt = R.getPt(testHit.dist)

            wt=self.barycentric(hitPt,self.p1,self.p2,self.p3)

            HITPOINT = (wt[0] + wt[1] + wt[2])
            if HITPOINT > .999 and HITPOINT < 1.001:
                return testHit
            else:
                return None
    def barycentric(self,hitPt,p1,p2,p3):
        A = self.area(p1,p2,p3)
        A1 = self.area(hitPt,p2,p3)
        A2 = self.area(hitPt,p1,p3)
        A3 = self.area(hitPt,p1,p2)
        wt1 = A1/A
        wt2 = A2/A
        wt3 = A3/A
        return (wt1,wt2,wt3)
    def area(self,p1,p2,p3):
        V = (p1-p2)
        W = (p2-p3)
        n = V.crossProduct(W)
        n = n.length()*.5       #half of length
        return n

class Checker(object):
    def __init__(self,mat1,mat2,spacing):
        self.mat1 = mat1
        self.mat2 = mat2
        self.spacing = spacing
    def getColor(self, hitPt):
        a = math.sin(hitPt.x * (math.pi/self.spacing)) > 0
        b = math.sin(hitPt.z * (math.pi/self.spacing)) > 0
        c = math.sin(hitPt.y * (math.pi/self.spacing)) > 0

        if (c==True and (a==b)) or (c==False and (a!=b)):
           return self.mat1.getColor(hitPt)
        else:
           return self.mat2.getColor(hitPt)

class Plane(object):
    def __init__(self, normal, d, mat1, mat2):
        self.normal = normal
        self.material1 = mat1
        self.material2 = mat2
        self.d = d
        self.material = Checker(self.material1, self.material2, 10.0)

    def hit(self, R):
        if not isinstance(R, Ray):
            raise ValueError("R must be a Ray object")
        Origin = R.o
        Direction = R.d

        b = (self.normal.dot(Direction))

        if b >= 0:
            return None
        else:
            t = (self.d - (self.normal.dot(Origin)))/b
            if t < 0:
                return None
            P = Direction * t

##            if P.dot(self.normal) > self.d:
##                return None

            hit = HitData(t,self.normal,self.material,self)

            return hit

        
class Sphere(object):
    def __init__(self, center, radius, material):
        self.center = center
        self.radius = radius
        self.material = material

    def hit(self, R):
        if not isinstance(R, Ray):
            raise ValueError("R must be a Ray object")
        self.origin = R.o
        self.direction = R.d

        Q = self.center - self.origin
        a = Q.dot(self.direction.normalizeCopy())

        e2 = (Q.length()**2) - (a**2)
        f = self.radius**2 - e2

        if f > 0:
            f = math.sqrt(f)
            t=a-f
            if t < 0:
                return None

            #self.normal = R.getPt(t).normalizeCopy()
            self.normal = (R.getPt(t) - self.center).normalizeCopy()
            
            hit = HitData(t,self.normal,self.material,self)
        else:
            return None

        ####################################################################
        # REFER TO NOTES TO LEARN MORE!!! LOOK FOR TRIANGLES AND CIRCLES!!!#
        ####################################################################

        return hit
