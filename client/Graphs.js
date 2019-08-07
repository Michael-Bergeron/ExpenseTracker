import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Doughnut, Bar} from 'react-chartjs-2';

export default function Graphs(props) {
  const budget = 3000;
  const data = {
    datasets: [{

    }]
  }
  return (
    <div className = 'container'>
      <div className='row left' style = {{width: '300px', height: '300px'}}>
        <CarouselProvider
            className = 'col 4'
            naturalSlideWidth={75}
            naturalSlideHeight={80}
            totalSlides={3}>
          <ButtonBack className = 'btn blue'>Back</ButtonBack>
          <div style={{display: 'inline', paddingLeft:'130px'}}></div>
          <ButtonNext className = 'btn blue'>Next</ButtonNext>
          <Slider>
            {props.data.map((item, index) => 
              <>
              <div>{item.date}</div>
              <Slide index={index}>
                <Doughnut 
                  width = {300}
                  height = {300}
                  options = {{maintainAspectRatio: false}}
                  data = {{
                    datasets: [{
                      data: item.amounts,
                      backgroundColor: [
                        'rgba(114, 147, 203, 1)',
                        'rgba(225, 151, 76, 1)',
                        'rgba(132,186,91, 1)',
                        'rgba(211,94,96, 1)',
                        'rgba(144, 103, 167, 1)',
                        'rgba(171, 104, 87, 1)',
                        'rgba(204, 194, 16, 1)',
                        'rgba(128, 133, 133, 1)',
                        'Yellow',
                      ]
                    }],
                    labels: item.categories
                  }} />
              </Slide>
              </>
            )}
          </Slider>
        </CarouselProvider>  
        <div style = {{position: 'absolute', left: '800px', top: '400px'}}>
          <Bar
            options = {{
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }}
            }
            data = {{
              datasets: [{
                data: [2950, 2500, 3196],
                backgroundColor: [
                  'rgba(114, 147, 203, 1)',
                  'rgba(225, 151, 76, 1)',
                  'rgba(132,186,91, 1)'
                ]
              }],
              labels: ['August', 'July', 'June']
            }}

          />
        </div>
      </div>
    </div>
  )
}
