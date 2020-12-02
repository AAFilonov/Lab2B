const content = [{
        month: "November",
        type: "Article",
        topic: "Software",
        date: "25.11.20"
    },
    {
        month: "October",
        type: "Article",
        topic: "3D_Printing",
        date: "12.10.20"
    },
    {
        month: "September",
        type: "Note",
        topic: "Printers",
        date: "2.09.20"
    }
]

const properties = {
    'month': "Month",
    'type': "Type",
    'topic': "Topic"
};




function printNews(arContent, selector) {


    const TemplateStart = '  <article class="content-item">';
    const TemplateInfo = '<div class="info"> <h3>{{type}}-{{topic}}-{{month}}</h3><h3>{{date}}</h3></div>';
    const TemplateTitle = '<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eaque, sed laborum, assumenda</h1>';
    const TemplateImg = '<div class="content-img"> <img src="img/{{img}}" alt=""></div>';
    const TemplateText = ' <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eaque, sed laborum, assumenda asperiores voluptatum deserunt rerum molestias temporibus dignissimos, obcaecati reprehenderit! Aperiam, eius. Eius mollitia quasi voluptatibus magnam.Quibusdam.</p></article>';

    let output = "";

    for (let item of arContent) {
        let tmpLine = TemplateStart + TemplateInfo + TemplateTitle + TemplateImg + TemplateText;

        tmpLine = tmpLine.replace('{{month}}', item.month);
        tmpLine = tmpLine.replace('{{type}}', item.type);
        tmpLine = tmpLine.replace('{{topic}}', item.topic);
        tmpLine = tmpLine.replace('{{date}}', item.date);
        switch (item.topic) {
            case '3D_Printing':
                tmpLine.replace('{{img}}', "3d.jpg");
                break;
            case 'Printers':
                tmpLine.replace('{{img}}', "printer_1.jpg");
                break;
            case 'Software':
                tmpLine.replace('{{img}}', "software.jpg");
                break;
            default:
                tmpLine.replace('{{img}}', "news.jpg");
                break;
        }
        output += tmpLine;
    };

    $(selector).html(output);
}

function printFilters(arContent, arProperties, selector) {

    const startTemplate = '<br>{{name}}<br>';
    //const lileTemplate = '<label><input type="checkbox" name="{{prop}}" value="{{name}}">{{name}}</label><br>';
    const lileTemplate = '<label><input type="checkbox" id="ch_{{prop}}_{{name}}" name="{{prop}}" value="{{name}}">{{name}}</label>';
    const endTemplate = '';

    let output = '';
    for (let prop in arProperties) {

        let tmpLine = startTemplate.replace('{{name}}', arProperties[prop]);
        let vals = [];
        for (let item of arContent) {
            if (!vals.includes(item[prop])) {
                vals.push(item[prop]);
            }
        }
        vals.sort();
        vals.forEach(function(item, index, array) {
            tmpLine += lileTemplate.replace("{{prop}}", prop).replaceAll("{{name}}", item);
        });

        output += tmpLine;
    };

    output += endTemplate;
    $(selector).html(output);
}

function readCurFilters(selector, properties) {

    let result = [];
    for (let prop in properties) {
        result.push(prop);
        let searchIDs = $("#filters input[name='" + prop + "']:checkbox:checked").map(function() {
            return $(this).val();
        }).get();
        result[prop] = searchIDs;
    }
    return result;
}

function applyFilters(data, filter, properties) {

    let result = [];
    for (let film of data) {
        let ok = true;
        for (let prop in properties) {
            if (!filter[prop].length)
                continue;
            if (filter[prop].indexOf(film[prop]) == -1)
                ok = false;
        }
        if (ok) {
            result.push(film);
        };
    }
    return result;
}

$(document).ready(function() {
    printNews(content, '#news_content');
    printNews(content, properties, '#filters');
    $('#filters input').change(function() {
        let curFilter = readCurFilters('#filters input', properties);
        let filtredContent = applyFilters(content, curFilter, properties);
        printFilms(filtredContent, '#news_content');
    });
});