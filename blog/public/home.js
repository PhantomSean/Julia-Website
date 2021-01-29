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
            <img class="card-img-top" src={image} alt={title}></img>
        )
    }
}

function readLink(id) {
    var strLink= "/post/id="+id;
    return strLink;
}

const Card = ({ item }) => {
    const { id, image, title, blurb } = item;

    return (  
        <div class="card mt-4" Style="width: 100%;">
            {imageCheck(image, title)}
            <div class="card-body d-flex flex-column">
                <h5 class="card-title mt-auto mb-auto pb-3">{title || "No Title"}</h5>
                <p class="card-text mt-auto mb-auto pb-3" dangerouslySetInnerHTML={{ __html: blurb} || "No Blurb"}></p>
                <a role="button" class="btn btn-info btn-md mr-auto mt-auto" href={readLink(id)}>Read More</a>
            </div>
        </div>
    )
}

class Home extends React.Component {
    constructor(props) {
       super(props);
       this.state = { data: [] };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        const response = await fetch('/posts');
        const data = await response.json();
        this.setState({ data })
    }

   render() {
       return (
        <div>
            <AppNav />
            <div class="container">
                <div class="row">
                    {
                        this.state.data.length > 0 ? (
                            this.state.data.map(item =>
                                <div class="col-sm-6 d-flex align-items-stretch">
                                    <Card item={item}/>
                                </div>
                            )
                        ) : (
                                <div class="card mt-5 col-sm">
                                    <div class="card-body">There are no posts yet!</div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
       )
   }

}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Home), domContainer);