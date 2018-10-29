//
// v = velocity of other frame relative to reference frame
// v is in m/s if div_c === 0
// v is fraction of c if div_c !== 0
//
function LT(v, div_c = 0)
{
    let c = 299792458;
    if (div_c) v *= c;
    let d = Math.sqrt(1-v**2/c**2);
    this.p = [1, -v, d, -v/c**2, 1, d,                      // x, t => x', t'
             1/v, -d/v, 1, d/v, -1/v, 1,                    // x, x' => t, t'
             v/c**2, d, 1, d, -v, 1,                        // x, t' => t, x'
             v, d, 1, d, -v/c**2, 1,                        // t, x' => x, t'
             c**2/v, -d*c**2/v, 1, d*c**2/v, -(c**2)/v, 1,  // t, t' => x, x'
             1, v, d, v/c**2, 1, d];                        // x', t' => x, t
    this.form = { 3:[0,0,1,2,3], 5:[6,0,2,1,3], 9:[12,0,3,1,2],
                  6:[18,1,2,0,3], 10:[24,1,3,0,2], 12:[30,2,3,0,1] };

    this.trans = function(uin, in_place = 0)
    {
        let u = in_place ? uin : uin.slice();
        let have = 0;
        if (u[0] !== null) have += 1;
        if (u[1] !== null) have += 2;
        if (u[2] !== null) have += 4;
        if (u[3] !== null) have += 8;
        let use = this.form[have];
        if (use)
        {
            let i = use[0];
            u[use[3]] = (this.p[i]*u[use[1]] + this.p[i+1]*u[use[2]])/this.p[i+2];
            u[use[4]] = (this.p[i+3]*u[use[1]] + this.p[i+4]*u[use[2]])/this.p[i+5];
        }
        else
        {
            console.log("input bad");
            u[0] = u[1] = u[2] = u[3] = null;
        }
        return u;
    }
}

function lt_test()
{
    let tr = new LT(.5, 1);
    let ref = [100000, 10, null, null];
    ref = tr.trans(ref);
    console.log(ref);
    for (let i = 0; i < 3; ++i)
        for (let j = i+1; j < 4; j++)
        {
            let test = ref.slice();
            test[i] = null;
            test[j] = null;
            test = tr.trans(test);
            console.log(test[i]-ref[i], test[j]-ref[j]);
        }
}

//lt_test();
