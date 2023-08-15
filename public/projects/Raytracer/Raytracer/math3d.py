#Chris Vaccarello
#ETGG1803 Concepts of 3d Mathematics
#LAB1 Vectors

import operator
import math

class Vector3:
    def __init__(self, x=0, y=0, z=0):
        self.x = float(x)
        self.y = float(y)
        self.z = float(z)

    def __str__(self):
        s = "<Vector3: " + str(self.x) + ", " + str(self.y) + ", " + str(self.z) + ">"
        return s

    def __add__(self, other):
        if isinstance(other, Vector3): 
            newVector = Vector3(self.x + other.x,self.y + other.y,self.z + other.z)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector3.__add__"

    def __sub__(self, other):
        if isinstance(other, Vector3):
            newVector = Vector3(self.x - other.x, self.y - other.y, self.z - other.z)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector3.__sub__"

    def __mul__(self, other):
        if operator.isNumberType(other):
            newVector = Vector3(self.x * other, self.y * other, self.z * other)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector3.__mul__"

    def __rmul__(self, other):
        return self.__mul__(other)

    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        elif index == 2:
            return self.z
        else:
            print "INVALID INDEX"

    def __setitem__(self, index, value):
        if index == 0:
            self.x = value
        elif index == 1:
            self.y = value
        elif index == 2:
            self.z = value
        else:
            print "INVALID INDEX"

    def __len__(self):
        return 3

    def length(self):
        return math.sqrt(self.x**2 + self.y**2 + self.z**2)
    
    def normalize(self):
        tempX = (self.x/self.length())
        tempY = (self.y/self.length())
        tempZ = (self.z/self.length())
        self.x = tempX
        self.y = tempY
        self.z = tempZ
    
    def normalizeCopy(self):
        v = Vector3(self.x,self.y,self.z)
        v.normalize()
        return v

    def dot(self,other):
        if isinstance(other,Vector3):
            dotAns = (self.x*other.x) + (self.y*other.y) + (self.z*other.z)
            return dotAns
        else:
            print "INVALID ARGUMENT to Vector3.dot"

    def crossProduct(self,other):
        if isinstance(other,Vector3):
            Cx = (self.y*other.z) - (self.z*other.y)
            Cy = (self.z*other.x) - (self.x*other.z)
            Cz = (self.x*other.y) - (self.y*other.x)
            newVector = Vector3(Cx,Cy,Cz)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector3.crossProduct"


class Vector4:
    def __init__(self, x=0, y=0, z=0, w=0):
        self.x = float(x)
        self.y = float(y)
        self.z = float(z)
        self.w = float(w)

    def __str__(self):
        s = "<Vector4: " + str(self.x) + ", " + str(self.y) + ", " + str(self.z) + ", " + str(self.w) + ">"
        return s

    def __add__(self, other):
        if isinstance(other, Vector4): 
            newVector = Vector4(self.x + other.x,self.y + other.y,self.z + other.z, self.w+other.w)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector4.__add__"

    def __sub__(self, other):
        if isinstance(other, Vector4):
            newVector = Vector4(self.x - other.x, self.y - other.y, self.z - other.z, self.w - other.w)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector4.__sub__"

    def __mul__(self, other):
        if operator.isNumberType(other):
            newVector = Vector4(self.x * other, self.y * other, self.z * other, self.w * other)
            return newVector
        else:
            print "INVALID ARGUMENT to Vector3.__mul__"

    def __rmul__(self, other):
        return self.__mul__(other)

    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        elif index == 2:
            return self.z
        elif index == 3:
            return self.w
        else:
            print "INVALID INDEX"

    def __setitem__(self, index, value):
        if index == 0:
            self.x = value
        elif index == 1:
            self.y = value
        elif index == 2:
            self.z = value
        elif index == 3:
            self.w = value
        else:
            print "INVALID INDEX"

    def __len__(self):
        return 4

    def length(self):
        return math.sqrt(self.x**2 + self.y**2 + self.z**2 + self.w**2)
    
    def normalize(self):
        tempX = (self.x/self.length())
        tempY = (self.y/self.length())
        tempZ = (self.z/self.length())
        tempW = (self.w/self.length())
        self.x = tempX
        self.y = tempY
        self.z = tempZ
        self.w = tempW
    
    def normalizeCopy(self):
        v = Vector4(self.x,self.y,self.z,self.w)
        v.normalize()
        return v

def dot4(other,other2):
    if isinstance(other,Vector4) and isinstance(other2,Vector4):
        dotAns = (other.x*other2.x) + (other.y*other2.y) + (other.z*other2.z) + (other.w*other2.w)
        return dotAns
    else:
        print "INVALID ARGUMENT to Vector4.dot"


class Matrix4:
    def __init__(self):
        self.m = []
        self.m.append(Vector4(1,0,0,0))
        self.m.append(Vector4(0,1,0,0))
        self.m.append(Vector4(0,0,1,0))
        self.m.append(Vector4(0,0,0,1))
    def __getitem__(self,s):
        if s>4 or s<0:
            print "INVALID INDEX"
        else:
            return self.m[s]

    def __str__(self):
        value = "<Matrix4:\n"
        value += "\t"+str(self.m[0][0])+"  "+str(self.m[0][1])+"  "+str(self.m[0][2])+"  "+str(self.m[0][3])+"\n"
        value += "\t"+str(self.m[1][0])+"  "+str(self.m[1][1])+"  "+str(self.m[1][2])+"  "+str(self.m[1][3])+"\n"
        value += "\t"+str(self.m[2][0])+"  "+str(self.m[2][1])+"  "+str(self.m[2][2])+"  "+str(self.m[2][3])+"\n"
        value += "\t"+str(self.m[3][0])+"  "+str(self.m[3][1])+"  "+str(self.m[3][2])+"  "+str(self.m[3][3])+"\n"
        value += ">\n"
        return value

    def __add__(self,other):
        if isinstance(other,Matrix4):
            vector1 = Vector4(self.m[0][0]+other[0][0],self.m[0][1]+other[0][1],self.m[0][2]+other[0][2],self.m[0][3]+other[0][3])
            vector2 = Vector4(self.m[1][0]+other[1][0],self.m[1][1]+other[1][1],self.m[1][2]+other[1][2],self.m[1][3]+other[1][3])
            vector3 = Vector4(self.m[2][0]+other[2][0],self.m[2][1]+other[2][1],self.m[2][2]+other[2][2],self.m[2][3]+other[2][3])
            vector4 = Vector4(self.m[3][0]+other[3][0],self.m[3][1]+other[3][1],self.m[3][2]+other[3][2],self.m[3][3]+other[3][3])
            newMatrix = Matrix4()
            newMatrix[0][0] = vector1[0]
            newMatrix[0][1] = vector1[1]
            newMatrix[0][2] = vector1[2]
            newMatrix[0][3] = vector1[3]
            newMatrix[1][0] = vector2[0]
            newMatrix[1][1] = vector2[1]
            newMatrix[1][2] = vector2[2]
            newMatrix[1][3] = vector2[3]
            newMatrix[2][0] = vector3[0]
            newMatrix[2][1] = vector3[1]
            newMatrix[2][2] = vector3[2]
            newMatrix[2][3] = vector3[3]
            newMatrix[3][0] = vector4[0]
            newMatrix[3][1] = vector4[1]
            newMatrix[3][2] = vector4[2]
            newMatrix[3][3] = vector4[3]
            return newMatrix
            
    def __sub__(self,other):
        if isinstance(other,Matrix4):
            vector1 = Vector4(self.m[0][0]-other[0][0],self.m[0][1]-other[0][1],self.m[0][2]-other[0][2],self.m[0][3]-other[0][3])
            vector2 = Vector4(self.m[1][0]-other[1][0],self.m[1][1]-other[1][1],self.m[1][2]-other[1][2],self.m[1][3]-other[1][3])
            vector3 = Vector4(self.m[2][0]-other[2][0],self.m[2][1]-other[2][1],self.m[2][2]-other[2][2],self.m[2][3]-other[2][3])
            vector4 = Vector4(self.m[3][0]-other[3][0],self.m[3][1]-other[3][1],self.m[3][2]-other[3][2],self.m[3][3]-other[3][3])
            newMatrix = Matrix4()
            newMatrix[0][0] = vector1[0]
            newMatrix[0][1] = vector1[1]
            newMatrix[0][2] = vector1[2]
            newMatrix[0][3] = vector1[3]
            newMatrix[1][0] = vector2[0]
            newMatrix[1][1] = vector2[1]
            newMatrix[1][2] = vector2[2]
            newMatrix[1][3] = vector2[3]
            newMatrix[2][0] = vector3[0]
            newMatrix[2][1] = vector3[1]
            newMatrix[2][2] = vector3[2]
            newMatrix[2][3] = vector3[3]
            newMatrix[3][0] = vector4[0]
            newMatrix[3][1] = vector4[1]
            newMatrix[3][2] = vector4[2]
            newMatrix[3][3] = vector4[3]
            return newMatrix

    def __mul__(self, other):
        if isinstance(other,Matrix4):
            a1=self.m[0][0]*other[0][0] + self.m[0][1]*other[1][0] + self.m[0][2]*other[2][0] + self.m[0][3]*other[3][0]
            a2=self.m[0][0]*other[0][1] + self.m[0][1]*other[1][1] + self.m[0][2]*other[2][1] + self.m[0][3]*other[3][1]
            a3=self.m[0][0]*other[0][2] + self.m[0][1]*other[1][2] + self.m[0][2]*other[2][2] + self.m[0][3]*other[3][2]
            a4=self.m[0][0]*other[0][3] + self.m[0][1]*other[1][3] + self.m[0][2]*other[2][3] + self.m[0][3]*other[3][3]

            b1=self.m[1][0]*other[0][0] + self.m[1][1]*other[1][0] + self.m[1][2]*other[2][0] + self.m[1][3]*other[3][0]
            b2=self.m[1][0]*other[0][1] + self.m[1][1]*other[1][1] + self.m[1][2]*other[2][1] + self.m[1][3]*other[3][1]
            b3=self.m[1][0]*other[0][2] + self.m[1][1]*other[1][2] + self.m[1][2]*other[2][2] + self.m[1][3]*other[3][2]
            b4=self.m[1][0]*other[0][3] + self.m[1][1]*other[1][3] + self.m[1][2]*other[2][3] + self.m[1][3]*other[3][3]

            c1=self.m[2][0]*other[0][0] + self.m[2][1]*other[1][0] + self.m[2][2]*other[2][0] + self.m[2][3]*other[3][2]
            c2=self.m[2][0]*other[0][1] + self.m[2][1]*other[1][1] + self.m[2][2]*other[2][1] + self.m[2][3]*other[3][2]
            c3=self.m[2][0]*other[0][2] + self.m[2][1]*other[1][2] + self.m[2][2]*other[2][2] + self.m[2][3]*other[3][2]
            c4=self.m[2][0]*other[0][3] + self.m[2][1]*other[1][3] + self.m[2][2]*other[2][3] + self.m[2][3]*other[3][2]

            d1=self.m[3][0]*other[0][0] + self.m[3][1]*other[1][0] + self.m[3][2]*other[2][0] + self.m[3][3]*other[3][0]
            d2=self.m[3][0]*other[0][1] + self.m[3][1]*other[1][1] + self.m[3][2]*other[2][1] + self.m[3][3]*other[3][1]
            d3=self.m[3][0]*other[0][2] + self.m[3][1]*other[1][2] + self.m[3][2]*other[2][2] + self.m[3][3]*other[3][2]
            d4=self.m[3][0]*other[0][3] + self.m[3][1]*other[1][3] + self.m[3][2]*other[2][3] + self.m[3][3]*other[3][3]

            vector1 = Vector4(a1,a2,a3,a4)
            vector2 = Vector4(b1,b2,b3,b4)
            vector3 = Vector4(c1,c2,c3,c4)
            vector4 = Vector4(d1,d2,d3,d4)
            newMatrix = Matrix4()
            newMatrix[0][0] = vector1[0]
            newMatrix[0][1] = vector1[1]
            newMatrix[0][2] = vector1[2]
            newMatrix[0][3] = vector1[3]
            newMatrix[1][0] = vector2[0]
            newMatrix[1][1] = vector2[1]
            newMatrix[1][2] = vector2[2]
            newMatrix[1][3] = vector2[3]
            newMatrix[2][0] = vector3[0]
            newMatrix[2][1] = vector3[1]
            newMatrix[2][2] = vector3[2]
            newMatrix[2][3] = vector3[3]
            newMatrix[3][0] = vector4[0]
            newMatrix[3][1] = vector4[1]
            newMatrix[3][2] = vector4[2]
            newMatrix[3][3] = vector4[3]
            return newMatrix
        elif isinstance(other,Vector4):
            a1 = dot4(self.m[0], other)
            a2 = dot4(self.m[1], other)
            a3 = dot4(self.m[2], other)
            a4 = dot4(self.m[3], other)
            newVector4 = Vector4(a1,a2,a3,a4)
            return newVector4
        else:
            print "INVALID ARGUMENT to Matrix4.__mul__"

    def getColCopy(self,column):
        newVector4 = Vector4(self.m[0][column],self.m[1][column],self.m[2][column],self.m[3][column])
        return newVector4

    def getTranspose(self):
        vector1 = Vector4(self.m[0][0],self.m[1][0],self.m[2][0],self.m[3][0])
        vector2 = Vector4(self.m[0][1],self.m[1][1],self.m[2][1],self.m[3][1])
        vector3 = Vector4(self.m[0][2],self.m[1][2],self.m[2][2],self.m[3][2])
        vector4 = Vector4(self.m[0][3],self.m[1][3],self.m[2][3],self.m[3][3])
        newMatrix = Matrix4()
        newMatrix[0][0] = vector1[0]
        newMatrix[0][1] = vector1[1]
        newMatrix[0][2] = vector1[2]
        newMatrix[0][3] = vector1[3]
        newMatrix[1][0] = vector2[0]
        newMatrix[1][1] = vector2[1]
        newMatrix[1][2] = vector2[2]
        newMatrix[1][3] = vector2[3]
        newMatrix[2][0] = vector3[0]
        newMatrix[2][1] = vector3[1]
        newMatrix[2][2] = vector3[2]
        newMatrix[2][3] = vector3[3]
        newMatrix[3][0] = vector4[0]
        newMatrix[3][1] = vector4[1]
        newMatrix[3][2] = vector4[2]
        newMatrix[3][3] = vector4[3]
        return newMatrix

