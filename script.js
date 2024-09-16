$(document).ready(function() {
    // Handle room selection on image map
    $('area').click(function(event) {
        event.preventDefault();
        const room = $(this).data('room');
        $('#room-name').text('You selected Room ' + room);
        $('#book-room').attr('data-room', room);
    });

    // Handle form submission
    $('#book-room').submit(function(event) {
        event.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const date = $('#date').val();
        const time = $('#time').val();
        const room = $(this).data('room');

        if (room) {
            $('#confirmation').html(`
                <p>Thank you, ${name}!</p>
                <p>You have booked Room ${room} on ${date} at ${time}.</p>
            `);
        } else {
            $('#confirmation').html(`<p>Please select a room before booking.</p>`);
        }

        // Reset form after submission
        $('#book-room')[0].reset();
    });
});
