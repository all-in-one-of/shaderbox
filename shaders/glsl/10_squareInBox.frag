
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;  

float stroke(float x, float s, float w){
    float d = step(s, x+w*.5) - step(s, x-w*.5) ;
    return clamp (d, 0., 1.);
}

float fill(float x, float size){
    return 1.-step(size, x);
}

float rectSDF(vec2 st, vec2 s){
    st = st*2.-1.;
    return max (abs (st.x /s.x),abs (st.y /s.y) );
}

void main(){
    // 色を黒に設定します
    vec3 color = vec3(0.0, 0.0, 0.0);
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float sdf = rectSDF(st, vec2(1.));
    color += stroke(sdf, .5, .125);
    color += fill(sdf, .1);

    gl_FragColor = vec4(color,1.0);
}