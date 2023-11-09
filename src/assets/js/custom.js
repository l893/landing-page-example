import 'core-js/actual';
import 'regenerator-runtime/runtime.js';
import { createPopper } from '@popperjs/core';
import 'bootstrap';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import 'bootstrap/dist/css/bootstrap.min.css';

import LazyLoad from "vanilla-lazyload";
import xml from '@/browserconfig.xml';
import json from '@/manifest.json';

import iconsfont from '../css/components/iconsfont.css';
import css from '../css/custom.css';

document.addEventListener('DOMContentLoaded', (event) => {
  // ** LAZY LOADING initiation
  let lazyLoadInstance = new LazyLoad();

  // ** Mobile Menu
  document.querySelectorAll('.navbar-toggler').forEach((el) =>
    el.addEventListener('click', function () {
      this.classList.toggle('active');
    })
  );

  document.querySelectorAll('.navbar-nav .a').forEach((el) =>
    el.addEventListener('click', function () {
      document.querySelector('.navbar-toggler').classList.remove('active');
    })
  );

  // ** Close navbar-collapse when <a>  clicked
  document.querySelectorAll('.navbar-nav .a').forEach((el) =>
    el.addEventListener('click', function () {
      document.querySelector('.navbar-collapse').classList.remove('show');
    })
  );

  // ** Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // ** Easy event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  // ** Easy on scroll event listener
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // ** Scrolls to an element with header offset
  const links = document.querySelectorAll('.navbar .navbar-nav .a');

  for (const link of links) {
    link.addEventListener('click', clickHandler);
  }

  let headerHeightNav = document.getElementById('header').offsetHeight;

  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop - headerHeightNav,
      behavior: 'smooth',
    });
  }

  const services = document.querySelectorAll('.services .services__content a');

  for (const service of services) {
    service.addEventListener('click', clickHandlerServices);
  }

  let headerHeightServ = document.getElementById('header').offsetHeight;

  function clickHandlerServices(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop - headerHeightServ,
      behavior: 'smooth',
    });
  }

  //** Toggle .header-scrolled class to #header when page is scrolled
  let selectHeader = select('#header');
  let selectTopbar = select('#topbar');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled');
        }
      } else {
        selectHeader.classList.remove('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled');
        }
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  // ** navs and tabs (nav_tab_column)
  let nav_tab = select('#myTab');

  if (nav_tab) {
    function nav_tab_column() {
      if (document.documentElement.clientWidth < 767.98) {
        nav_tab.classList.toggle('flex-column');
      }
    }
    window.addEventListener('load', nav_tab_column);
  }

  // ** Back to top button
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }
});
