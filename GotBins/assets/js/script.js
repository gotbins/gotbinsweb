"use strict";
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function closeAllTasks() {
    $(".taskbar > button").each(function () {
        $(this).removeClass("opened");
    });
}
$("button").click(function () {
    if ($(this).attr("app")) {
        if ($(this).hasClass("box")) {
            var box = $(this);
            $(".app").each(function () {
                $(this).removeClass("active");
            });
            $(".taskbar button").each(function () {
                if ($(this).attr("app") == box.attr("app")) {
                    closeAllTasks();
                    $(".apps > ." + $(this).attr("app")).addClass("active");
                    $(this).addClass("opened");
                }
            });
        }
        else {
            $(".app").each(function () {
                $(this).removeClass("active");
            });
            if ($(this).hasClass("opened")) {
                $(".apps > ." + $(this).attr("app")).removeClass("active");
                console.log("closing app...");
                $(this).removeClass("opened");
            }
            else {
                closeAllTasks();
                console.log("opening app...");
                $(this).addClass("opened");
                $(".apps > ." + $(this).attr("app")).addClass("active");
            }
        }
    }
});
// chrome
$(".apps > .chrome > iframe").on("load", function () {
    $(".apps .chrome input").prop("value", document.querySelector(".apps .chrome iframe").contentWindow.location
        .href);
});
$(".apps .chrome header form").on("submit", function (e) {
    e.preventDefault();
    console.log("[ google chrome ] loading webpage...");
    $(".apps .chrome iframe").prop("src", $(".apps .chrome input").val());
});
function cli_write(msg) {
    $(".apps .cmd .output").append("<pre>" + msg + "</pre>");
}
var is_proc_serv = "false";
function stopcmdnow() {
    $(".taskbar button").each(function () {
        if ($(this).attr("app") == "cmd") {
            $(this).removeClass("opened");
        }
    });
    $(".apps ." + "cmd" + "").removeClass("active");
}
$(".apps .cmd form").submit(function (e) {
    cli
    e.preventDefault();
    cli_write("guest@gotbins.xyz $ " + $(".apps .cmd input").val());
    var cmd_raw = $(".apps .cmd input").val();
    $(".apps .cmd input").val("");
    var cmd = cmd_raw.split(" ");
    if (cmd[0] == "help") {
        cli_write("------------------------ [ Help Commands ] ------------------------");
        cli_write("     help        Opens a list of commands");
        cli_write("     start        Restarts this device");
        cli_write("     about        Learn more about GotBins");
        cli_write("---------------------- [ End Help Commands ] ----------------------");
    }
   
    if (cmd[0] == "start") {
        cli_write("Starting " + cmd[1] + " if it exists");
        $(".taskbar button").each(function () {
            if ($(this).attr("app") == cmd[1]) {
                $(this).addClass("opened");
            }
        });
        $(".apps > ." + cmd[1]).addClass("active");
        if (cmd[2]) {
            if (cmd[2] == "stopcmdnow") {
                cmd[0] = "stop";
                cmd[1] = "cmd";
                closeAllTasks();
                $(".taskbar").fadeOut(200);
                setTimeout(function () {
                    $(".taskbar").fadeIn(200);
                    $(".apps .restart").removeClass("active");
                }, 3000);
            }
        }
    }
    if (cmd[0] == "stop") {
        cli_write("Stopping " + cmd[1] + " if it is running");
        $(".taskbar button").each(function () {
            if ($(this).attr("app") == cmd[1]) {
                $(this).removeClass("opened");
            }
        });
        $(".apps ." + cmd[1] + "").removeClass("active");
    }

});