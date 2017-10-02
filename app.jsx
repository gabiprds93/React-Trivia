class Aplication extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.imgs = props.imgs;
        this.preguntas = props.preguntas;
        this.total = 5;
        this.arregloRespuestas = new Array(this.total);
        this.contCorrectas = 0;

        this.state = 
        {
            contador: 0,
            titulo: "Aqui estan tus respuestas:",
            respuestas: [],
            invisible: " invisible",
            flechaAnterior: "",
            flechaSiguiente: " disabled",            
        };
    }

   guardarRespuestas(e)
    {
        this.arregloRespuestas[this.state.contador] = e.target.textContent;
        this.siguiente();
    }

   siguiente()
    {
        if(this.state.contador >= 0 && this.state.contador <= this.total - 1)
        {
            this.setState({
                contador: this.state.contador + 1,
                invisible: "",
                flechaAnterior: "", 
            });
        }
        if(this.arregloRespuestas[this.state.contador + 1] == undefined)
        {
            this.setState({
                flechaSiguiente: " disabled", 
            });
            this.crearLista();
        }
   }

   anterior()
   {
       if(this.state.contador >= 1 && this.state.contador <= this.total)
       {
            this.setState({
                contador: this.state.contador - 1,
            });
       }
        if(this.state.contador == 1)
        {
            this.setState({
                flechaAnterior: " disabled",
            });
        }
        this.setState({
            flechaSiguiente: "",
        });
    }

    crearLista()
    {
        let num = 0;
        let respuestas = this.arregloRespuestas.map((item, index) => {
            return <h4 key={index}>{index+1}. {this.preguntas[index].pregunta} {item}</h4>;
        });
        this.setState({
            respuestas: respuestas,
        });
        
    }
    comprobar()
    {
        let cont = 0;
        let incorrectas = [];
        for(let i in this.preguntas)
        {
            if(this.arregloRespuestas[cont] == this.preguntas[i].respuesta)
            {
                this.contCorrectas++;
            }
            else
            {
                incorrectas.push(cont);
            }
            cont++;
        }
        this.setState({
            contador: this.state.contador,
            titulo: `${this.contCorrectas} de ${this.total} correctas!`,
            invisible: " invisible",
        });
        let respuestas = this.state.respuestas;
        for(let i of incorrectas)
        {
            respuestas[i] = <h4 key={i} style={{color:"red"}}>{i+1}. {this.preguntas[i].pregunta} {this.arregloRespuestas[i]} <strong>{this.preguntas[i].respuesta}</strong></h4>;           
        }
        this.setState({
            respuestas: respuestas,
        });
    }
    reiniciar()
    {
        this.contCorrectas = 0;
        this.arregloRespuestas = [];
        this.setState({
            contador: 0,
            titulo: "Aqui estan tus respuestas:",
            invisible: " invisible",
        })
    }
    
    render() 
    {
        let secPreguntas;
        if(this.state.contador < this.total)
        {
            secPreguntas = (
            <div className="container" id="contenedorPreguntas">
                <div className="row text-center">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <h1>{this.preguntas[this.state.contador].pregunta}</h1>
                    </div>
                </div>
                <div className="row text-center opciones">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <h1 className="btn btn-default" id="opcion1" onClick={e => this.guardarRespuestas(e)}>{this.preguntas[this.state.contador].opcion1}</h1>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <h1 className="btn btn-default" id="opcion1" onClick={e => this.guardarRespuestas(e)}>{this.preguntas[this.state.contador].opcion2}</h1>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <h1 className="btn btn-default" id="opcion1" onClick={e => this.guardarRespuestas(e)}>{this.preguntas[this.state.contador].opcion3}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 col-md-offset-0 col-xs-offset-0 text-center">
                        <img className="btn social" src="img/Facebook-icon.png" alt=""/>
                        <img className="btn social" src="img/Googleplus-icon.png" alt=""/>
                        <img className="btn social" src="img/Twitter-icon.png" alt=""/>
                    </div>
                </div>
            </div>);
        }
        if(this.state.contador == this.total)
        {
            secPreguntas = (
            <div className="container" id="contenedorRespuestas">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <h1 id="titulo">{this.state.titulo}</h1>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12 col-sm-12 col-xs-12" id="respuestas">
                        {this.state.respuestas}
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className={"btn btn-primary " + this.state.invisible} id="btnEnviar" onClick={e => this.comprobar(e)}>Enviar</div>
                        <div className="btn btn-primary oculto" id="btnComenzar" onClick={e => this.reiniciar(e)}>Comenzar de nuevo</div>
                    </div>
                </div>
            </div>);
        }
        return (
        <div>
            <header id="cabecera">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 col-sm-1 col-xs-2 col-md-offset-10 col-sm-offset-9 col-xs-offset-6">
                            <img className={"btn "+ this.state.invisible + this.state.flechaAnterior} id="anterior" src="img/flecha-izq.png" onClick={e => this.anterior(e)} alt=""/>
                        </div>
                        <div className="col-md-1 col-sm-1 col-xs-2">
                            <img className={"btn"+ this.state.invisible + this.state.flechaSiguiente} id="siguiente" src="img/flecha-der.png" onClick={e => this.siguiente(e)} alt=""/>
                        </div>
                    </div>
                </div>
            </header>
            <section id="secImagen">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-8 col-xs-10 col-md-offset-4 col-sm-offset-3 col-xs-offset-1 text-center">
                            <img className="img-responsive" id="imagen" alt="" src={this.imgs[this.state.contador]}/>
                        </div>
                    </div>
                </div>
            </section>
            <section id="secProgreso">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h4 id="progreso">{this.state.contador} de {this.total} respondidas</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped active" id="barra" role="progressbar"
                                aria-valuenow={this.state.contador*20} aria-valuemin="0" aria-valuemax="100" style={{width:this.state.contador*20+"%"}}>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="secPreguntas">
                {secPreguntas}
            </section>
            <section id="fondo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <img className="img-responsive" src="img/cinema.png" alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                            <label className="">Copyright 2017</label>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        );
    }
}

const arregloImagenes = 
[
    "img/aladino.jpg", 
    "img/frozen.jpg", 
    "img/mulan.jpg", 
    "img/toystory.jpg", 
    "img/elreyleon.jpg", 
    "img/final.gif"
];

const preguntas =
[
    {
        pregunta: "¿De qué película es esta imagen?",
        opcion1: "Aladino",
        opcion2: "El Rey León",
        opcion3: "La Sirenita",
        respuesta: "Aladino",
    },
    {
        pregunta: "¿Te suena familiar?",
        opcion1: "Pinocho",
        opcion2: "Frozen",
        opcion3: "La Bella Durmiente",
        respuesta: "Frozen",
    },
    {
        pregunta: "¿Recuerdas esta?",
        opcion1: "Enredados",
        opcion2: "Fantasía",
        opcion3: "Mulán",
        respuesta: "Mulán",
    },
    {
        pregunta: "¿Sabes cuál es esta película?",
        opcion1: "Buscando a Nemo",
        opcion2: "Toy Story",
        opcion3: "Enredados",
        respuesta: "Toy Story",
    },
    {
        pregunta: "¿Y esta?",
        opcion1: "Aladino",
        opcion2: "El Rey León",
        opcion3: "La Sirenita",
        respuesta: "El Rey León",
    },
];

ReactDOM.render(<Aplication imgs={arregloImagenes} 
                preguntas={preguntas}/>, document.getElementById("container"));