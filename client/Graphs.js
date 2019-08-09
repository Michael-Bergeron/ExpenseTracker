import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Doughnut, Bar} from 'react-chartjs-2';
import {Button, Dropdown} from 'react-materialize';

export default function Graphs(props) {
  const [timeFrame, setTimeFrame] = useState('Month')
  return (
    <div className = 'container-fluid'>
      <div className='card' style = {{position: 'absolute', top: '200px', left: '450px', width: '340px', height: '500px', padding: '20px'}}>
        <div style = {{paddingBottom: '20px'}}>
          <Dropdown trigger = {<Button style = {{position: 'relative', left: '110px', backgroundColor: '#022d64'}}>{timeFrame}</Button>}>
            <a style = {{color: '#022d64'}} onClick = {(e) => setTimeFrame('Month')}>Month</a>
            <a style = {{color: '#022d64'}} onClick = {(e) => setTimeFrame('Year')}>Year</a>
          </Dropdown>
        </div>
        {timeFrame === 'Month' ? (
          <CarouselProvider
            className = 'col 4'
            naturalSlideWidth={75}
            naturalSlideHeight={80}
            currentSlide={props.data.length-1}
            totalSlides={props.data.length}>
          <ButtonBack style = {{backgroundColor: '#022d64'}} className = 'btn'>Previous</ButtonBack>
          <div style={{display: 'inline', paddingLeft:'100px'}}></div>
          <ButtonNext style = {{backgroundColor: '#022d64'}} className = 'btn'>Next</ButtonNext>
          <Slider>
            {props.data.map((item, index) => 
              <Slide key = {Math.random()} index={index}>
                <div className = 'center'>{item.date}</div>
                <Doughnut 
                  width = {350}
                  height = {350}
                  options = {{maintainAspectRatio: true}}
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
            )}
          </Slider>
        </CarouselProvider>) : (
          <CarouselProvider
            className = 'col 4'
            naturalSlideWidth={75}
            naturalSlideHeight={80}
            totalSlides={1}>
          <Slider>
              <>
              <div className = 'center'>2019</div>
              <Slide>
                <Doughnut 
                  width = {300}
                  height = {300}
                  options = {{maintainAspectRatio: false}}
                  data = {{
                    datasets: [{
                      data: props.yearData.amounts,
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
                    labels: props.yearData.labels
                  }} />
              </Slide>
              </>
          </Slider>
        </CarouselProvider>
        )}
        
        <div style = {{position: 'absolute', top: '-5px', left: '450px', width: '500px', height: '300px'}} className = 'card'>
          <div>
            <p style = {{paddingTop: '5px', fontWeight: 'bold'}} className = 'center'>Month to Month Totals</p>
          </div>
          <Bar
            options = {{
              legend: {
                display: false
              },
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
                data: props.monthlyTotals.data,
                label: '',
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
              labels: props.monthlyTotals.labels
            }}
          />
        </div>
      </div>
    </div>
  )
}
