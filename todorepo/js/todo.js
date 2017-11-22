$(document).ready(function () {
    // //variables for counter;
    //
    // click or keypress on button

     $('#button').click(function () {

         if(createToDoItem())
            counter()

            console.log(result);
     });

     $('input[name=task]').keypress(function(event) {

        if (event.keyCode == 13) {
            if(createToDoItem())
                counter()               //main counter
            console.log(result);
         }
     });
            // ?
    $("body").on('click', '#todo > li > .checkbox', function() {
        var search = 0;
        if (this.checked) {
            $(this).parent().attr('active', 'false');

            $(this).parent().find('.edit').fadeOut('slow');
        } else {
            $(this).parent().attr('active', 'true');

            $(this).parent().find('.edit').fadeIn('slow');
        }

        search = ($(this).closest("li").attr('id'));

        for( var key in result) {
            if(key == search) {
                result[key].active = $(this).closest('li').attr('active');
            }
        }

        counter()  //main counter()
    });

    $('#checked').click(function() {
        newContent(result,'checked')
    });

    $('#unchecked').click(function() {
        newContent(result,'unchecked')
    });

    $('#all').click(function() {
        newContent(result,'all')
    });

    $('#del').click(function() {
        console.log(result);
            for (var i = 0; i < result.length; i++) {
                if(result[i].active == 'false') {
                    result.splice(i, 1);
                    i--;
                }
            }
        console.log(result);

            newContent(result, 'all')
            counter()
        id = 0;
         });
                                            // если время будет, поменяю на $(elem).click(nfe)
    $("body").on('click', '.pages > a', function () {
        var myid = ($(this).attr('id'));
        var basket =[];
        var startIdx = cntitems * myid;
        var endIdx = startIdx + cntitems;
        basket = result.slice(startIdx, endIdx);
        showItems(basket)

     });

    // //show all list, only checked or unchecked.
    //
    // //click on checked or unchecked
     $('#on').click(function() {
        for(var i = 0; i < result.length; i++) {
            result[i].active = 'false';
        }
         counter()
         newContent(result, 'all')
     });
    //
         $('#off').click(function() {
         for (var i = 0; i <result.length; i++) {
             result[i].active = 'true';
         }

        counter()
             newContent(result, 'all')
         });

    // //dblclick for edit
     $("ul").on('dblclick','.edit', function() {
        var title = $(this).parent().find('.title');
         var textField = $(this).parent().find('.textfield');
         var Item = $(this).parent();



         textField.addClass('edit');

         var isEdit = $(this).hasClass('edit');
         $(this).text('save');

        $(this).click(function() {
            var id = +$(this).parent().attr('id');
             var text = $(this).parent().find('.textfield').val().trim();

            if (isEdit) {
                 if(!text.trim()) {
                    alert('Введи новое знач');
                     return false;
                }

                textField.removeClass('edit');
            }

             $(this).parent().find('.title').text(text);
            saveItem(result, Item, id)
            $('.textfield').val('');

            $(this).off();

         });

     });

    // //del todoitem
    // $("body").on('click', '#todo .close', function () {
    //     $(this).closest("li").remove();
    //
    //     counter();
    // });
    $('#settings').click(function() {
        //cntitems = $('input[type=number]').val();
        if (cntitems > (result.length)) return false;

        cntpage = Math.ceil((result.length) / cntitems);

        addPage(cntpage)

    });

});

var id = 0;
var result = [];
var filter = 'all';
var cntitems = 5;
var idpage = 0;
var cntpage = 0;
var lastpage = 0;

function saveItem(result,Item, id) {
    var pos = 0;

    for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        if( result[i].id == id )  {
            pos = result.indexOf(result[i]);
        }
    }

        var obj = ({id: +Item.attr('id'), title: Item.find('.textfield').val(), active:Item.attr('active') });
        result[pos] = obj;
        //return result;
}
            //fix заного рисую линки страниц
function addPage(cntpage) {
    $('.pages').html('');
    for(var i = 1; i <= cntpage; i++){
        $('.pages').append("<a href='#' id= " + idpage +">" + idpage + "</a>");
        idpage++;
    }

    lastpage = idpage;
    idpage = 0;
    return lastpage;
}

function counter() {
    var complete = 0;
    var uncomplete = 0;

      for (var i = 0; i < result.length; i++) {
          if(result[i].active == 'true') {
              complete++
          } else {
              uncomplete++
          }

      }

    $('body').find('.uncomplete > span').text(uncomplete);
    $('body').find('.complete > span').text(complete);
}

function createToDoItem() {
    if (!$('input[name=task]').val().trim()) {
        alert('Введите значение');
        return false;
    }

    event.preventDefault();
    result.push({id:id, title: $("input[name=task]").val(), active: 'true' });



    cntpage = Math.ceil((result.length) / cntitems);  //length - 1

    addPage(cntpage) //return lastpage

    if(result.length > cntitems) {   //length - 1  totalobj / totalitems on page
        $('input[name=task]').val('');

        currentContent(cntitems)
        return true;
    }
        console.log(result);
    console.log(result[id]);
       $('#todo').append(
            "<li id=" + result[id].id + " class='list__item clearfix' active='true'>" +
            "<input type='checkbox' class='checkbox'>" +
            "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
            "<p class='title'>" + result[id].title  + "</p>" +
            "<a href='#' class='edit'>edit</a>" +
            "<input type='text' class='textfield'>" +
            "</li>");
        id++;
        $('input[name=task]').val('');
        return true;
}

function currentContent(cntitems) {
    var basket = [];
    var pos = cntitems;
    var mytodo = $('#todo');
    var listitems  = '';
    basket = result.slice(-pos);

     for (var i = 0; i < cntitems; i++) {
         listitems += "<li id=" + basket[i].id + " class='list__item clearfix' active=" + basket[i].active + ">" + "<input type='checkbox'  class='checkbox' " + ((basket[i].active == 'false') ? " checked />" : '>') +
             "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
             "<p class='title'>" + basket[i].title + "</p>" +
             "<a href='#' class='edit'>edit</a>" +
             "<input type='text' class='textfield'>" +
             "</li>"
     }

       mytodo.html(listitems)
}
                    //fix
function showItems(basket) {
    $('#todo').html('');
    for(var i = 0; i < basket.length; i++) {
        if (basket[i].active == 'false') {
            $('#todo').append("<li id=" + basket[i].id + " class='list__item clearfix' active=" + basket[i].active + ">" + "<input type='checkbox'  class='checkbox' checked />" +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + basket[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>");
        } else {
            $('#todo').append("<li id=" + basket[i].id + " class='list__item clearfix' active=" + basket[i].active + ">" + "<input type='checkbox' class='checkbox'>" +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + basket[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>");
        }

    }

    return $('todo');
}
                    //fix
function newContent(result, filter) {
    var listitems = '';
    var count = 0;
    console.log(result.length);
    if(result.length == 0) {
        listitems = '';
        $('#todo').html(listitems)
        return true;
    }

    if (filter == 'all') {
        for (var i = 0; i < cntitems; i++) {
            listitems += "<li id=" + result[i].id + " class='list__item clearfix' active=" + result[i].active + ">" + "<input type='checkbox'  class='checkbox' " + ((result[i].active == 'false') ? " checked />" : '>') +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + result[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>";
        }

        $('#todo').html(listitems)

    } else if(filter == 'unchecked') {
        for (var i = 0; i < result.length; i++) {
            if (count == cntitems) break;
            if (result[i].active == 'false') continue;
                listitems += "<li id=" + result[i].id + " class='list__item clearfix' active=" + result[i].active + ">" + "<input type='checkbox'  class='checkbox' >" +
                    "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                    "<p class='title'>" + result[i].title + "</p>" +
                    "<a href='#' class='edit'>edit</a>" +
                    "<input type='text' class='textfield'>" +
                    "</li>";
                count++
            }

        $('#todo').html(listitems)

    } else if (filter == 'checked') {
                for (var i = 0; i < result.length; i++) {
                    if (count == cntitems) break;
                    if(result[i].active == 'true') continue;
                listitems += "<li id=" + result[i].id + " class='list__item clearfix' active=" + result[i].active + ">" + "<input type='checkbox'  class='checkbox' " + " checked />" +
                    "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                    "<p class='title'>" + result[i].title + "</p>" +
                    "<a href='#' class='edit'>edit</a>" +
                    "<input type='text' class='textfield'>" +
                    "</li>";
                    count++
                    }

        $('#todo').html(listitems)
    }

    //currentContent(lastpage)
}