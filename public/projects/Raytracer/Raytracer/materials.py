# materials.py:  Various materials that can be applied to 3d objects.

try:        reload(math3d)
except:     import math3d
import pygame

class SolidColor(object):
    def __init__(self, Ka, Kd, Ks, Shininess=50, Clarity=0, Mirror=0,index=1,ImageName=None):
        # must be a Vector3 (x=red, y=green, z=blue) between (0-1)
        if not isinstance(Ka, math3d.Vector3):
            raise ValueError("Ka must be a Vector3")
        if not isinstance(Kd, math3d.Vector3):
            raise ValueError("Kd must be a Vector3")
        if not isinstance(Ks, math3d.Vector3):
            raise ValueError("Ks must be a Vector3")
        self.Ka = Ka
        self.Kd = Kd
        self.Ks = Ks
        self.Shininess = Shininess
        self.Clarity = Clarity
        self.RefractionIndex = index
        self.Mirror = Mirror
        if ImageName!=None:
            self.Image = pygame.image.load(ImageName)
        else:
            self.Image = ImageName

    def getColor(self, pos):
        if not isinstance(pos, math3d.Vector3):
            raise ValueError("Pos must be a Vector3")
        self.color = (self.Ka, self.Kd, self.Ks, self.Shininess, self.Clarity, self.Mirror, self.RefractionIndex,self.Image)
        return self.color
