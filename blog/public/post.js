const e = React.createElement;

const AppNav = () => (
   <nav class="navbar navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/home">Julia Dunajska</a>
            <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <li class="nav-item">
                    <a class="nav-link p-2" href="#">
                        CV
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link p-2" href="https://www.linkedin.com/in/julia-dunajska-693ba118b/">
                        <icon class="fa fa-linkedin-square"></icon>
                    </a>
                </li>
            </ul>
        </div>
   </nav>
);

function imageCheck(image, title) {
    if (image != "" ) {
        return (
            <img class="rounded float-right" src={image} alt={title}></img>
        )
    }
}

function readLink(id) {
    var strLink= "/posts/"+id;
    return strLink;
}

const Blog = ({ item }) => {
    const { image, title, content } = item;

    return (  
        <div>
            {imageCheck(image, title)}
            <h1>{title || "No Title"}</h1>
            <p dangerouslySetInnerHTML={{ __html: content} || "No Content"}></p>
        </div>
    )
}

function getUrlVar() {
    var str = window.location.href;
    var pair = str.split("=");
    return pair[1]
}

class Post extends React.Component {
    constructor(props) {
       super(props);
       this.state = { data : [] };
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = async () => {
        const response = await fetch('/posts/'+getUrlVar());
        const data = await response.json();
        this.setState({ data : [data] });
    }

   render() {
       return (
        <div>
            <AppNav />
            <div class="container" id="blog-content">
                    {
                        this.state.data.length > 0 ? (
                            this.state.data.map(item =>
                                    <Blog item={item}/>
                            )
                        ) : (
                                <div class="card mt-5 col-sm">
                                    <div class="card-body">There are no posts yet!</div>
                                </div>
                            )
                    }
                </div>
        </div>
       )
   }

}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Post), domContainer);