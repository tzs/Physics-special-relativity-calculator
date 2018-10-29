function init()
{
    setup_settings();
    setup_converters();
}

function setup_settings()
{
    let settings = ["#v", "#scale"];
    for (let i = 0; i < settings.length; ++i)
    {
        document.querySelector(settings[i]).onchange = function ()
        {
            recalc_all();
        }
    }
}

function setup_converters()
{
    let i = 0;
    let template = document.querySelector('div.point');
    for (i = 0; i < 10; ++i)
    {
        let newdiv = template.cloneNode(true);
        template.parentNode.insertBefore(newdiv, template.nextSibling);
    }

    let pts = document.querySelectorAll('div.point');
    for (let i = 0; i < pts.length; ++i)
    {
        let fields = pts[i].querySelectorAll('div.field');
        for (let j = 0; j < fields.length; ++j)
        {
            if (j < 2)
                active_field(fields[j], 'in' + j);
            else
                passive_field(fields[j]);
            add_recalc_handler(fields[j], 'input[type=text]', 'change');
            add_recalc_handler(fields[j], 'span.mark', 'activate');
        }
    }
}

function add_recalc_handler(parent, child_sel, kind)
{
    if (kind == 'change')
        parent.querySelector(child_sel).onchange = function ()
        {
            recalc(parent, kind);
        }
    else
        parent.querySelector(child_sel).onclick = function ()
        {
            recalc(parent, kind);
        }
}

function set_highlight(point, field, kind)
{
    let in0 = point.querySelector('div.in0');
    let in1 = point.querySelector('div.in1');
    if (field.isSameNode(in1))
    {
        passive_field(in0); passive_field(in1);
        active_field(in0, 'in1');
        active_field(in1, 'in0');
    }
    else if (! field.isSameNode(in0))
    {
        passive_field(in1);
        passive_field(in0);
        active_field(in0, 'in1');
        active_field(field, 'in0');
    }
}

function is_active(field)
{
    return field.classList.contains('in0')
        || field.classList.contains('in1');
}

function get_field(point, which, scale)
{
    if (is_active(point.querySelector('div.' + which)))
        return point.querySelector('div.' + which + ' input[type=text]').value * scale;
    return null;
}

function set_field(point, which, value)
{
    point.querySelector('div.' + which + ' input[type=text]').value = value;
}

function recalc_all()
{
    let points = document.querySelectorAll('div.point');
    for (let i = 0; i < points.length; ++i)
        recalc_point(points[i]);
}

function recalc(field, kind)
{
    let point = field.parentElement;
    if (kind == 'activate')
        set_highlight(point, field, kind);
    if (kind == 'activate' || is_active(field))
        recalc_point(point);
}

function recalc_point(point)
{
    let scale = parseFloat(document.querySelector('input#scale').value);
    let v = document.querySelector('input#v').value;
    let x0 = get_field(point, 'x0', scale);
    let t0 = get_field(point, 't0', 1);
    let x1 = get_field(point, 'x1', scale);
    let t1 = get_field(point, 't1', 1);
    let lt = new LT(v, 1);
    let out = lt.trans([x0, t0, x1, t1]);
    set_field(point, 'x0', out[0]/scale);
    set_field(point, 't0', out[1]);
    set_field(point, 'x1', out[2]/scale);
    set_field(point, 't1', out[3]);
}

function active_field(field, cl)
{
    field.classList.add(cl);
}

function passive_field(field)
{
    field.classList.remove('in0');
    field.classList.remove('in1');
}

function set_note(parent, msg)
{
    parent.querySelector('p.note').innerText = msg;
}
