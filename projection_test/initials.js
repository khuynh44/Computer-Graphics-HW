/******************************************************************************
Draw your initials here in perspective.

It must be obvious from your drawing that the initials are in perspective.
You can achieve this in two ways.  One way is to create a 3D set of initials,
and make sure that multiple depths of the parts are shown. The other way is
to have your initials in single plane, but slant the plane in which your
initials are in so that we can see perspective foreshortening.

It is not sufficient to use diagonal instead of straight lines to give the
illusion of perspective.  
******************************************************************************/

function persp_initials() {
  Init_Matrix();
  Perspective (60.0, 1.0, 100.0);
  BeginShape(LINES);
  Vertex(-1,1,-6);
  Vertex(-1,-1,-4);
  
  Vertex(-1, 0, -5);
  Vertex(0, 1, -6);
  
  Vertex(-1, 0, -5);
  Vertex(0, -1, -4);
  
  Vertex(1,1,-6);
  Vertex(1,-1,-4);
  
  Vertex(2,1,-6);
  Vertex(2,-1,-4);
  
  Vertex(1,0,-5);
  Vertex(2,0,-5);
  EndShape();
}
