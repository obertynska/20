window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //timer


    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    let deadline = '08 March 2020';


    const getTimeRemaining = (deadline) => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaning = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaning % 60),
            minutes = Math.floor((timeRemaning / 60) % 60),
            hours = Math.floor(timeRemaning / 60 / 60);
        if (timeRemaning > 0) {
            return {hours, minutes, seconds};
        } else {
            return {hours: '0', minutes: '0', seconds: '0'};
        }

    };


    const updateClock = () => {

        let timer = getTimeRemaining(deadline);

        for (let key in timer) {
            if (timer[key] < 10) {
                timer[key] = "0" + timer[key];
            }
        }

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

    };
    updateClock();
    setInterval(updateClock, 1000);


//menu
    const menu = document.querySelector('menu');


    const togglleMenu = () => {
        document.body.addEventListener('click', (event) =>{
            let target = event.target;

            if(target && target.closest('.menu')){
               menu.classList.add('active-menu');
            } else if ( target && (target.tagName === 'A' || !target.classList.contains('active-menu'))){
                menu.classList.remove('active-menu');
            }

        });
    };

    togglleMenu();

    //pop up
    const popUp = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn');



    const togglePopUp = () => {
        popUp.style.display = 'block';
    };

    popUp.addEventListener('click', (event)=>{
        let target = event.target;

        if(target.classList.contains('popup-close')){
            popUp.style.display = 'none';
        }else{
            target = target.closest('.popup-content');
            if(!target){
                popUp.style.display = 'none';
            }
        }
    });


        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', togglePopUp)
        });


    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            };
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target){
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });

};
    tabs();

    //слайдер

       const slider = () => {
        const btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            dotsParrent = document.querySelector('.portfolio-dots');
        let dot;


        let currentSlide = 0,
             interval;

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                let element = document.createElement('li');
                element.classList.add('dot');
                dotsParrent.appendChild(element);
            }

            dot = document.querySelectorAll('.dot');

            dot[0].classList.add('dot-active');
            slide[0].classList.add('portfolio-item-active');

        };
        addDots();


        const prevSlide = (elem, index, strClass) =>{
          elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) =>{
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () =>{

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) =>{
           interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () =>{
           clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

           if(!target.matches('#arrow-left, #arrow-right, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }

            if(currentSlide < 0){
                currentSlide = slide.length -1          // довжина масиву быльша за кількість елементів масиву ніж інтекс останнього елементу
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) =>{
              if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                  stopSlide();
              }
        });

        slider.addEventListener('mouseout', (event) =>{
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        startSlide(1500);

    };
    slider();


});
