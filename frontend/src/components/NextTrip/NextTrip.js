import { Card, Stack, Typography, Grid, CardMedia } from '@mui/material';
import './NextTrip.css'

function NextTrip() {
    const cards = [
        {
            img: 'https://sandtontimes.co.za/wp-content/uploads/2022/08/sandtontimes-sandton-towers-hotel-exterior-2000x1125-1.jpg',
            title: 'Sandton City\nHotel',
            distance: '53km',
            bg: '#FF0080'
        },
        {
            img: 'https://www.doreebonner.co.uk/wp-content/uploads/2023/07/moving-to-johannesburg.jpg',
            title: 'Joburg City\nHotel',
            distance: '53km',
            bg: '#FF5B00'
        },
        {
            img: 'https://images.trvl-media.com/lodging/35000000/34160000/34157500/34157423/4aa4f745.jpg?impolicy=fcrop&w=357&h=201&p=1&q=medium',
            title: 'Woodmead City\nHotel',
            distance: '53km',
            bg: '#e30f8ece'
        },
        {
            img: 'https://cdn.audleytravel.com/3959/2826/79/1029099-cape-town.jpg',
            title: 'Hyde Park\nHotel',
            distance: '53km',
            bg: '#FF0080'
        }
    ];

    return (
        <div>
            <Typography variant="h4" sx={{ fontWeight: 500, ml: 15, mt: 9, mb: 4 }}>
                Inspiration for your next trip
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {cards.map((card, idx) => (
                    <Grid item key={idx}>
                        <Card sx={{ width: 270, background: card.bg }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={card.img}
                                alt={card.title}
                            />
                            <Stack mt={2} spacing={1} pl={2}>
                                <Typography variant="h6" color="white" sx={{ whiteSpace: 'pre-line' }}>
                                    {card.title}
                                </Typography>
                                <Typography color="white" sx={{ mb: 4 }}>
                                    {card.distance}
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default NextTrip;
