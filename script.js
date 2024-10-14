$(document).ready(function() {
    let isDebugMode = false;

    // Toggle debug mode on checkbox change
    $('#mode-toggle').change(function() {
        isDebugMode = $(this).is(':checked');
    });

    // Handle room selection or coordinate display based on mode
    $('.room-outline').on('click', function(event) {
        event.preventDefault();
        let room = $(this).attr('id');
        switch(room) {
            case 'room-a':
                room = '2FT09';
                break;
            case 'room-b':
                room = '3LA07'; // Ensure you are using the correct room names
                break;
            default:
                room = 'sigma';
        }

        if (isDebugMode) {
            const position = $(this).position();
            const width = $(this).width();
            const height = $(this).height();
            $('#room-name').text(`Coordinates: Top = ${position.top}, Left = ${position.left}, Width = ${width}, Height = ${height}`);
            return;
        }

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

            // Send form info to Nodemailer
            const formData = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: 'email-send.js', // Ensure your server is configured to handle this
                data: formData,
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        } else {
            $('#confirmation').html(`<p>Please select a room before booking.</p>`);
        }

        // Reset form after submission
        $('#book-room')[0].reset();
    });

    // Handle image clicks in debug mode to show x, y coordinates
    $('.floor-map').on('click', function(event) {
        if (isDebugMode) {
            const imgOffset = $(this).offset();
            const clickX = event.pageX - imgOffset.left;
            const clickY = event.pageY - imgOffset.top;
            $('#room-name').text(`Clicked at: X = ${clickX}, Y = ${clickY}`);
        }
    });

    const buttons = document.querySelectorAll('.button button');
    const floorMaps = document.querySelectorAll('.floor-map');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const selectedFloorMapId = `${e.target.id}-map`;
            floorMaps.forEach((map) => {
                map.style.display = map.id === selectedFloorMapId ? 'block' : 'none';
            });
        });
    });
});
