$(document).ready(function () {
    let circleSize = 200;
    let animationSpeed = 1000;
    let isFilled = true;
    let hasBorder = true;
    let startTime = null;
    let endTime = null;

    $("#increaseSize").click(function () {
        circleSize += 10;
        $("#circle").css({ width: circleSize, height: circleSize });
    });

    $("#decreaseSize").click(function () {
        if (circleSize > 10) {
            circleSize -= 10;
            $("#circle").css({ width: circleSize, height: circleSize });
        }
    });

    $("#toggleFill").click(function () {
        isFilled = !isFilled;
        if (isFilled) {
            $("#circle").css("background-color", $("#circleColor").val());
        } else {
            $("#circle").css("background-color", "transparent");
        }
    });

    $("#toggleBorder").click(function () {
        hasBorder = !hasBorder;
        if (hasBorder) {
            document.documentElement.style.setProperty('--bs-border-color', '#0055aa');
        } else {
            document.documentElement.style.setProperty('--bs-border-color', 'transparent');
        }
    });

    $("#animateCircle").click(function () {
        $(this).hide();
        $("#stopAnimation").show();
        hideTimeDisplay();
        startTime = moment();
        animateContinuously();
    });

    $("#stopAnimation").click(function () {
        $("#circle").stop();
        $(this).hide();
        $("#animateCircle").show();
        endTime = moment();
        saveToLocalStorage();
        showTimeDisplay();
    });

    $("#increaseSpeed").click(function () {
        if (animationSpeed > 100) {
            animationSpeed -= 100;
        }
    });

    $("#decreaseSpeed").click(function () {
        animationSpeed += 100;
    });

    function animateContinuously() {
        $("#circle").animate({ width: 1, height: 1 }, animationSpeed, function () {
            $(this).animate({ width: circleSize, height: circleSize }, animationSpeed, animateContinuously);
        });
    }

    $("#circleColor").on("input", function () {
        if (isFilled) {
            $("#circle").css("background-color", $(this).val());
        }
    });

    $("#borderColor").on("input", function () {
        if (hasBorder) {
            document.documentElement.style.setProperty('--bs-border-color', $(this).val());
        }
    });

    function saveToLocalStorage() {
        let startMoment = moment(startTime);
        let endMoment = moment();

        let duration = endMoment.diff(startMoment, "seconds");

        localStorage.setItem("startTime", startMoment.format("YYYY-MM-DD HH:mm:ss"));
        localStorage.setItem("endTime", endMoment.format("YYYY-MM-DD HH:mm:ss"));
        localStorage.setItem("duration", duration);
    }

    function showTimeDisplay() {
        $("#smallText").text("First Start Time: " + localStorage.getItem("startTime"));
        $("#largeText").text("Duration: " + localStorage.getItem("duration") + " seconds");
        $("#smallTextEnd").text("End Time: " + localStorage.getItem("endTime"));
        $(".time-display").show();
    }

    function hideTimeDisplay() {
        $(".time-display").hide();
    }

    $("#animateCircle").click(function () {
        $(this).hide();
        $("#stopAnimation").show();
        hideTimeDisplay();
        startTime = new Date();
        animateContinuously();
    });

    $("#stopAnimation").click(function () {
        $("#circle").stop();
        $(this).hide();
        $("#animateCircle").show();
        endTime = new Date();
        saveToLocalStorage();
        showTimeDisplay();
    });

    function animateContinuously() {
        $("#circle").animate({ width: 1, height: 1 }, animationSpeed, function () {
            $(this).animate({ width: circleSize, height: circleSize }, animationSpeed, animateContinuously);
        });
    }
});
