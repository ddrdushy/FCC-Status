
var key="ae28f23f134c4364ad45e7b7355cfa91c92038bb";
var arr=[];
var points=0;
var html='<table class="table" id="data"><tr><th>SNO</th><th>Avatar</th><th>Name</th><th>User Name</th><th>Points</th></tr>';

$(document).ready(function(){
    var url='https://api.gitter.im/v1/rooms?access_token='+key;
    var roomId="";
    var noOfUsers=0;
    $.ajax({
        type:'GET',
        url:url,
        //data:data,
        async: false,
        dataType: 'json',
        success: function (data) {
            //Do stuff with the JSON data
            for(var i=0;i< data.length;i++){
                if(data[i]["name"]=='kgisl/campsite'){
                    roomId=data[i]["id"];
                    noOfUsers=data[i]["userCount"];
                    break;
                }

            }
        },
        error:function(xhr, textStatus, errorThrown){
            points=0;
        }
    });
    var jsonData=[];

    for(var i=0;i<noOfUsers;i+=30){
        $.ajax({
            type:'GET',
            url:'https://api.gitter.im/v1/rooms/'+roomId+'/users?access_token='+key+'&skip='+i,
            //data:data,
            async: false,
            dataType: 'json',
            success: function (data) {
                $.merge(jsonData,data);
                //alert(jsonData);
            },
            error:function(xhr, textStatus, errorThrown){
                points=0;
            }
        });
    }
    getData(jsonData);
});

function getData(jsonData){

        //alert(json["array"].length
        var len=jsonData.length;
        var sum=0;
        for(var i=0;i<len;i++){
            if(jsonData[i]["id"]!=='546fc9f1db8155e6700d6e8c') {
                    points=browniePointsFetcher(jsonData[i]["username"]);
                    sum+=points;
                    arr.push({
                        avatar:jsonData[i]["avatarUrlSmall"],
                        name:jsonData[i]["displayName"],
                        uname:jsonData[i]["username"],
                        points:points
                    });
                
                $('.progress-bar').css({
                    width: (i/len) * 100 + '%'
                });
            }
        }
        $('.progress-bar').prop("hidden",true);


        arr.sort(function(a,b){
            return a.points- b.points;
        });

        arr.reverse();
        var j=0;
        
        
        html+=arr.map(function (a) {
            j++;
            return '<tr><td>'+(j)+'</td>'+dataFormatter(a.avatar, a.name, a.uname, a.points)+'</tr>';
        }).join('');
        html+='</table>';

        $("#data").html(html);

        var a=$("#data").html();
    $("#campers").html('<h2><span class="label label-info">Total Campers:- '+j+'</span></h2>');
        $("#totalProblems").html('<h2><span class="label label-info">Total Problems:- '+sum+'</span></h2>');

}

function browniePointsFetcher(uname){
    var points=0;
    var url='https://www.freecodecamp.com/api/users/about?username='+uname.toLowerCase();
    $.ajax({
        type:'GET',
        url:url,
        //data:data,
        async: false,
        dataType: 'json',
        success: function (data) {
            //Do stuff with the JSON data
            points=data["about"]["browniePoints"];
        },
        error:function(xhr, textStatus, errorThrown){
            points=0;
        }
    });
    return points;
}


function dataFormatter(image,name,uname,points){
    var temp_html='<td>';
    temp_html+='<img src='+image+' class="img-thumbnail" width="100px" ></img></td>';
    temp_html+='<td>';
    temp_html+='<h3>'+name+'</h3></td>';
    temp_html+='<td>';
    temp_html+='<h3><a href="http://freecodecamp.com/'+uname+'" target="_blank">'+uname+'</a></h3></td>';
    temp_html+='<td>';
    if(points===0){
        temp_html+='<h3><span class="label label-warning">'+points+'</span></h3></td>';
    }else{
        temp_html+='<h3>'+points+'</h3></td>';
    }

    return temp_html;
}
