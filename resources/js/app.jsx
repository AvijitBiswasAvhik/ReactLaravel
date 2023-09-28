/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Button from './components/button';
if(document.getElementById('react-button')){
    const index = ReactDOM.createRoot(document.getElementById('react-button'));
    index.render(<Button />);
}

