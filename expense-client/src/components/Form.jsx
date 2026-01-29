function Form() {
    return (
        <div className="container">
            <form action="">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                    />
                </div>
                <label htmlFor="inputPassword5" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and
                    must not contain spaces, special characters, or emoji.
                </div>
                <button type="button" className="btn btn-primary">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Form;