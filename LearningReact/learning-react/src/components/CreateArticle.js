import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

import Sidebar from './Sidebar';

class CreateArticle extends Component {

	url = Global.url;

	titleRef = React.createRef();
	contentRef = React.createRef();

	state = {
		article: {},
		status: null,
		selectedFile: null
	};

	changeState = () => {
		this.setState({
			article: {
				title: this.titleRef.current.value,
				content: this.contentRef.current.value
			}
		});
		//console.log(this.state);
	}

	saveArticle = (event) => {
		event.preventDefault();

		// Rellenar state con formulario
		this.changeState();
		// console.log(this.titleRef.current.value);
		// console.log(this.contentRef.current.value);
		
		// Hacer petición post
		axios.post(this.url + '/save', this.state.article)
					.then(res => {
						if (res.data.article) {
							this.setState({
								article: res.data.article,
								status: 'waiting'
							});

							// Upload image
							if (this.state.selectedFile !== null) {
								// Get id from the save article
								let articleId = this.state.article._id;

								// Create from data and add file
								const formData = new FormData();

								formData.append(
									'file0',
									this.state.selectedFile,
									this.state.selectedFile.name
								);

								// Peticion
								axios.post(this.url + '/upload-image/' + articleId, formData)
									.then(res => {
										if (res.data.article) {
											this.setState({
												article: res.data.article,
												status: 'success'
											});
										} else {
											this.setState({
												article: res.data.article,
												status: 'failed'
											});
										}
									});

							} else {
								this.setState({
									status: 'success'
								});
							}

						} else {
							this.setState({
								status: 'failed'
							});
						}
					});
	}

	fileChange = (event) => {
		// console.log(event);
		this.setState({
			selectedFile: event.target.files[0]
		});

		console.log(this.state);
	}

	render() {

		if (this.state.status === 'success') {
			return <Redirect to='/blog'/>
		}

		return(
			<div className="center">
				<section id="content">
					<h1 className="subheader">Crear articulos</h1>

					<form className="mid-form" onSubmit={this.saveArticle}>
						<div className='form-group'>
							<label htmlFor='title'>Titulo</label>
							<input type="text" name="title" ref={this.titleRef} onChange={this.changeState}/>
						</div>

						<div className='form-group'>
							<label htmlFor='content'>Contenido</label>
							<textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
						</div>

						<div className='form-group'>
							<label htmlFor='file0'>Imagen</label>
							<input type="file" name="file0" onChange={this.fileChange}/>
						</div>

						<input type="submit" value="Guardar" className="btn btn-success"/>

					</form>
				</section>
				<Sidebar/>
			</div>
		);
	}

}

export default CreateArticle;