function _bottom_plate_extrude_1_6_outline_fn(){
    return new CSG.Path2D([[139.75,-101.75],[177.75,-101.75]]).appendPoint([177.75,-99.375]).appendPoint([196.75,-99.375]).appendPoint([196.75,-97]).appendPoint([217.25,-97]).appendPoint([217.25,-99.375]).appendPoint([276.64,-99.375]).appendPoint([276.64,-152.7800701]).appendPoint([285.3256094,-158.3947488]).appendPoint([300.6969323,-169.5626685]).appendPoint([277.4794149,-201.5188398]).appendPoint([260.8945665,-189.4692422]).appendPoint([243.5945929,-181.9554287]).appendPoint([225.1104556,-178.202677]).appendPoint([187.25,-178.375]).appendPoint([187.25,-160.125]).appendPoint([139.75,-160.125]).appendPoint([139.75,-101.75]).close().innerToCAG()
.subtract(
    CAG.circle({"center":[159.5,-140.5],"radius":1.1})
.union(
    CAG.circle({"center":[159.5,-121.5],"radius":1.1})
).union(
    CAG.circle({"center":[271.393616,-172.9329305],"radius":1.1})
).union(
    CAG.circle({"center":[207,-158.625],"radius":1.1})
).union(
    CAG.circle({"center":[235.5,-120.3125],"radius":1.1})
)).extrude({ offset: [0, 0, 1.6] });
}




                function bottom_plate_case_fn() {
                    

                // creating part 0 of case bottom_plate
                let bottom_plate__part_0 = _bottom_plate_extrude_1_6_outline_fn();

                // make sure that rotations are relative
                let bottom_plate__part_0_bounds = bottom_plate__part_0.getBounds();
                let bottom_plate__part_0_x = bottom_plate__part_0_bounds[0].x + (bottom_plate__part_0_bounds[1].x - bottom_plate__part_0_bounds[0].x) / 2
                let bottom_plate__part_0_y = bottom_plate__part_0_bounds[0].y + (bottom_plate__part_0_bounds[1].y - bottom_plate__part_0_bounds[0].y) / 2
                bottom_plate__part_0 = translate([-bottom_plate__part_0_x, -bottom_plate__part_0_y, 0], bottom_plate__part_0);
                bottom_plate__part_0 = rotate([0,0,0], bottom_plate__part_0);
                bottom_plate__part_0 = translate([bottom_plate__part_0_x, bottom_plate__part_0_y, 0], bottom_plate__part_0);

                bottom_plate__part_0 = translate([0,0,0], bottom_plate__part_0);
                let result = bottom_plate__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return bottom_plate_case_fn();
            }

        