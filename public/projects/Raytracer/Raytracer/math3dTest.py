try:   reload(math3d)
except: import math3d

M = math3d.Matrix4()     # Mine sets m to identity.
#m.identity()
print "M = "
print M

# First row
M[0][0] = 1.0
M[0][1] = 2.0
M[0][2] = 3.0
M[0][3] = 4.0
# Second row
M[1][0] = 5.0
M[1][1] = 6.0
M[1][2] = 7.0
M[1][3] = 8.0
# Third row
M[2][0] = 9.0
M[2][1] = 10.0
M[2][2] = 11.0
M[2][3] = 12.0
# Fourth row
M[3][0] = 13.0
M[3][1] = 14.0
M[3][2] = 15.0
M[3][3] = 16.0

print "m, transposed = "
print M.getTranspose()

print "M = "
print M



N = math3d.Matrix4()     # Mine sets m to identity.
# First row
N[0][0] = 17.0
N[0][1] = 18.0
N[0][2] = 19.0
N[0][3] = 20.0
# Second row
N[1][0] = 21.0
N[1][1] = 22.0
N[1][2] = 23.0
N[1][3] = 24.0
# Third row
N[2][0] = 25.0
N[2][1] = 26.0
N[2][2] = 27.0
N[2][3] = 28.0
# Fourth row
N[3][0] = 29.0
N[3][1] = 30.0
N[3][2] = 31.0
N[3][3] = 32.0

print "N = "
print N

print "M * N ="
print M * N

print "M + N ="
print M + N

print "M's second column: " + str(M.getColCopy(1))

u = math3d.Vector4(33,34,35,36)
v = math3d.Vector4(37,38,39,40)
print "u = " + str(u)
print "v = " + str(v)
print "u-dot-v = " + str(math3d.dot4(u, v))

print "N * u = " + str(N * u)
