// PayPal.Donation.Button({
//     env:'production',
//     hosted_button_id:'YX4BZGD2UNFNJ',
//     image: {
//     src:'/assets/support-btn.png',
//     alt:'Donate with PayPal button',
//     title:'PayPal - The safer, easier way to pay online!',
//     }
// }).render('#donate-button');
const navBtn = document.getElementById('nav-btn');
navBtn.style.width = '150px';
navBtn.href = '/draft-draw';
navBtn.style.backgroundImage = 'url(/assets/draft-draw-btn.png)';
navBtn.style.backgroundSize = 'cover';
navBtn.style.backgroundPosition = 'center';
navBtn.style.backgroundRepeat = 'no-repeat';