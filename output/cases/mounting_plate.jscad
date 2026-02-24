function _mounting_plate_extrude_1_5_outline_fn(){
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
).union(
    new CSG.Path2D([[276.7417738,-173.3567929],[287.9062083,-181.4682294]]).appendPoint([296.0176448,-170.3037949]).appendPoint([284.8532103,-162.1923584]).appendPoint([276.7417738,-173.3567929]).close().innerToCAG()
).union(
    new CSG.Path2D([[265.573854,-188.7281158],[276.7382885,-196.8395523]]).appendPoint([284.849725,-185.6751178]).appendPoint([273.6852905,-177.5636813]).appendPoint([265.573854,-188.7281158]).close().innerToCAG()
).union(
    new CSG.Path2D([[248.0175379,-180.2576192],[260.6244652,-185.8705849]]).appendPoint([266.2374309,-173.2636576]).appendPoint([253.6305036,-167.6506919]).appendPoint([248.0175379,-180.2576192]).close().innerToCAG()
).union(
    new CSG.Path2D([[255.7455341,-162.9002555],[268.3524614,-168.5132212]]).appendPoint([273.9654271,-155.9062939]).appendPoint([261.3584998,-150.2933282]).appendPoint([255.7455341,-162.9002555]).close().innerToCAG()
).union(
    new CSG.Path2D([[238.1,-118.9],[251.9,-118.9]]).appendPoint([251.9,-105.1]).appendPoint([238.1,-105.1]).appendPoint([238.1,-118.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[238.1,-137.9],[251.9,-137.9]]).appendPoint([251.9,-124.1]).appendPoint([238.1,-124.1]).appendPoint([238.1,-137.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[219.1,-116.525],[232.9,-116.525]]).appendPoint([232.9,-102.725]).appendPoint([219.1,-102.725]).appendPoint([219.1,-116.525]).close().innerToCAG()
).union(
    new CSG.Path2D([[219.1,-135.525],[232.9,-135.525]]).appendPoint([232.9,-121.725]).appendPoint([219.1,-121.725]).appendPoint([219.1,-135.525]).close().innerToCAG()
).union(
    new CSG.Path2D([[200.1,-114.15],[213.9,-114.15]]).appendPoint([213.9,-100.35]).appendPoint([200.1,-100.35]).appendPoint([200.1,-114.15]).close().innerToCAG()
).union(
    new CSG.Path2D([[200.1,-133.15],[213.9,-133.15]]).appendPoint([213.9,-119.35]).appendPoint([200.1,-119.35]).appendPoint([200.1,-133.15]).close().innerToCAG()
).union(
    new CSG.Path2D([[181.1,-116.525],[194.9,-116.525]]).appendPoint([194.9,-102.725]).appendPoint([181.1,-102.725]).appendPoint([181.1,-116.525]).close().innerToCAG()
).union(
    new CSG.Path2D([[181.1,-135.525],[194.9,-135.525]]).appendPoint([194.9,-121.725]).appendPoint([181.1,-121.725]).appendPoint([181.1,-135.525]).close().innerToCAG()
).union(
    new CSG.Path2D([[162.1,-118.9],[175.9,-118.9]]).appendPoint([175.9,-105.1]).appendPoint([162.1,-105.1]).appendPoint([162.1,-118.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[162.1,-137.9],[175.9,-137.9]]).appendPoint([175.9,-124.1]).appendPoint([162.1,-124.1]).appendPoint([162.1,-137.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[143.1,-118.9],[156.9,-118.9]]).appendPoint([156.9,-105.1]).appendPoint([143.1,-105.1]).appendPoint([143.1,-118.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[143.1,-137.9],[156.9,-137.9]]).appendPoint([156.9,-124.1]).appendPoint([143.1,-124.1]).appendPoint([143.1,-137.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[209.6,-175.025],[223.4,-175.025]]).appendPoint([223.4,-161.225]).appendPoint([209.6,-161.225]).appendPoint([209.6,-175.025]).close().innerToCAG()
).union(
    new CSG.Path2D([[190.6,-175.025],[204.4,-175.025]]).appendPoint([204.4,-161.225]).appendPoint([190.6,-161.225]).appendPoint([190.6,-175.025]).close().innerToCAG()
).union(
    new CSG.Path2D([[238.1,-156.9],[251.9,-156.9]]).appendPoint([251.9,-143.1]).appendPoint([238.1,-143.1]).appendPoint([238.1,-156.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[219.1,-154.525],[232.9,-154.525]]).appendPoint([232.9,-140.725]).appendPoint([219.1,-140.725]).appendPoint([219.1,-154.525]).close().innerToCAG()
).union(
    new CSG.Path2D([[200.1,-152.15],[213.9,-152.15]]).appendPoint([213.9,-138.35]).appendPoint([200.1,-138.35]).appendPoint([200.1,-152.15]).close().innerToCAG()
).union(
    new CSG.Path2D([[181.1,-154.525],[194.9,-154.525]]).appendPoint([194.9,-140.725]).appendPoint([181.1,-140.725]).appendPoint([181.1,-154.525]).close().innerToCAG()
).union(
    new CSG.Path2D([[162.1,-156.9],[175.9,-156.9]]).appendPoint([175.9,-143.1]).appendPoint([162.1,-143.1]).appendPoint([162.1,-156.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[143.1,-156.9],[156.9,-156.9]]).appendPoint([156.9,-143.1]).appendPoint([143.1,-143.1]).appendPoint([143.1,-156.9]).close().innerToCAG()
).union(
    new CSG.Path2D([[229.0837542,-175.6223867],[242.5821911,-178.491568]]).appendPoint([245.4513724,-164.9931311]).appendPoint([231.9529355,-162.1239498]).appendPoint([229.0837542,-175.6223867]).close().innerToCAG()
).union(
    new CSG.Path2D([[256.61,-134.8333333],[274.39,-134.8333333]]).appendPoint([274.39,-101.8333333]).appendPoint([256.61,-101.8333333]).appendPoint([256.61,-134.8333333]).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.5] });
}




                function mounting_plate_case_fn() {
                    

                // creating part 0 of case mounting_plate
                let mounting_plate__part_0 = _mounting_plate_extrude_1_5_outline_fn();

                // make sure that rotations are relative
                let mounting_plate__part_0_bounds = mounting_plate__part_0.getBounds();
                let mounting_plate__part_0_x = mounting_plate__part_0_bounds[0].x + (mounting_plate__part_0_bounds[1].x - mounting_plate__part_0_bounds[0].x) / 2
                let mounting_plate__part_0_y = mounting_plate__part_0_bounds[0].y + (mounting_plate__part_0_bounds[1].y - mounting_plate__part_0_bounds[0].y) / 2
                mounting_plate__part_0 = translate([-mounting_plate__part_0_x, -mounting_plate__part_0_y, 0], mounting_plate__part_0);
                mounting_plate__part_0 = rotate([0,0,0], mounting_plate__part_0);
                mounting_plate__part_0 = translate([mounting_plate__part_0_x, mounting_plate__part_0_y, 0], mounting_plate__part_0);

                mounting_plate__part_0 = translate([0,0,0], mounting_plate__part_0);
                let result = mounting_plate__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return mounting_plate_case_fn();
            }

        