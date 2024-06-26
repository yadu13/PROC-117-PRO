var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()

//Load HTML DOM
$(document).ready(function () {
    $("#display_date").html(display_date)
})

let predicted_sentiment;
//HTML-->JavaScript--->Flask
//Flask--->JavaScript--->HTML

$(function () {
    $("#predict_button").click(function () {

        let input_data = {
            "text": $("#text").val()
        }
        console.log(input_data)

        $.ajax({
            type: 'POST',
            url: "/predict-sentiment",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                
                // Result Received From Flask ----->JavaScript
                predicted_sentiment = result.data.predicted_sentiment
                emo_url = result.data.predicted_sentiment_img_url

                
                // Display Result Using JavaScript----->HTML
                $("#prediction").html(predicted_sentiment)
                $('#prediction').css("display", "block");

                $("#emo_img_url").attr('src', emo_url);
                $('#emo_img_url').css("display", "block");
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
})

