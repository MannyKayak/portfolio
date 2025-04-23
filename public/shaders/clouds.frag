uniform float u_time;

float circle(vec2 uv, vec2 pos, float radius) {
    return smoothstep(radius, radius - 0.01, length(uv - pos));
}

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    vec2 u = uv;
    u.y += 0.05 * sin(u_time * 0.2);

    vec3 sky = vec3(0.5, 0.7, 1.0);
    vec3 white = vec3(1.0);

    float c = 0.0;
    c += circle(u, vec2(0.3, 0.6), 0.3);
    c += circle(u, vec2(0.4, 0.6), 0.3);
    c += circle(u, vec2(0.35, 0.65), 0.3);

    vec3 finalColor = mix(sky, white, clamp(c, 0.0, 1.0));

    return vec4(finalColor, 1.0);
}
