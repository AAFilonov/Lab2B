const content = [{
        month: "November",
        type: "Article",
        topic: "Software",
        date: "25.11.20",
        img: "software.jpg"
    },
    {
        month: "November",
        type: "Note",
        topic: "Printers",
        date: "4.11.20",
        img: "printer_1.jpg"
    },
    {
        month: "November",
        type: "Note",
        topic: "3D_Printing",
        date: "1.11.20",
        img: "3d.jpg"
    },
    {
        month: "October",
        type: "Note",
        topic: "Printers",
        date: "19.10.20",
        img: "printer_1.jpg"
    },
    {
        month: "October",
        type: "Article",
        topic: "3D_Printing",
        date: "12.10.20",
        img: "3d.jpg"
    },
    {
        month: "October",
        type: "Article",
        topic: "Software",
        date: "4.10.20",
        img: "software.jpg"
    },
    {
        month: "October",
        type: "Article",
        topic: "3D_Printing",
        date: "12.10.20",
        img: "3d.jpg"
    },
    {
        month: "September",
        type: "Note",
        topic: "Printers",
        date: "3.09.20",
        img: "printer_1.jpg"
    },
    {
        month: "September",
        type: "Note",
        topic: "Software",
        date: "1.09.20",
        img: "software.jpg"
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
        tmpLine = tmpLine.replace('{{img}}', item.img);
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
            tmpLine = tmpLine.replace("{{prop}}", prop);
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



function checkEmpty(data, filter, properties) {

    let CheckboxList = $('#filters input:checkbox:not(:checked)').toArray();
    for (let checkbox of CheckboxList) {
        let tmpFilters = [];
        tmpFilters = $.extend(true, [], filter);
        tmpFilters[checkbox.name].push(checkbox.value);
        let filtredContent = applyFilters(content, tmpFilters, properties);
        if (filtredContent.length == 0) {
            checkbox.disabled = true;
        }
    }

}

function checkSame(data, filter, properties) {

    let CheckboxList = $('#filters input:checkbox:not(:checked)').toArray();
    for (let checkbox of CheckboxList) {
        let tmpFilters = [];
        tmpFilters = $.extend(true, [], filter);
        tmpFilters[checkbox.name].push(checkbox.value);
        let NewContent = applyFilters(data, tmpFilters, properties);
        let filtredContent = applyFilters(data, filter, properties);
        let isSame = true;
        if (filtredContent.length != NewContent.length) {
            isSame = false;
        } else {

            let ComparisonResult = [];
            for (let i = 0; i < filtredContent.length; i++) {
                ComparisonResult.push(filtredContent[i] == NewContent[i]);
            }
            if (ComparisonResult.indexOf(false) != -1) {
                isSame = false;
            }
        }
        if (isSame) {
            checkbox.disabled = true;
        }
    }


}


$(document).ready(function() {
    printNews(content, '#news_content');
    printFilters(content, properties, '#filters');
    $('#filters input').change(function() {
        let curFilter = readCurFilters('#filters input', properties);

        let filtredContent = applyFilters(content, curFilter, properties);
        $('#filters input:checkbox').prop('disabled', false);
        checkEmpty(content, curFilter, properties);
        checkSame(content, curFilter, properties);
        printNews(filtredContent, '#news_content');
    });
});