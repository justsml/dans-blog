import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import { navigateTo } from "gatsby-link";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const styles = theme => ({
  submit: {
    margin: "1.5em 0",
    display: "inline-block"
    //width: "100%"
  },
  recaptcha: {
    margin: "1.5em 0",
    display: "inline-block",
    width: "200px"
  },
  multilineInput: {
    lineHeight: 1.4,
    // marginLeft: "3%",
    fontSize: "1.2em"
  },
  singleLineInput: {
    lineHeight: 1.4,
    fontSize: "1.2em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "47%",
      marginLeft: "3%",
      "&:first-child": {
        marginRight: "3%",
        marginLeft: 0
      }
    }
  },
  submitError: {
    background: "red",
    color: "white"
  },
  btnBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "350px"
  }
});

const MAX_RETRIES = 20;

class ContactForm extends React.PureComponent {
  state = {
    name: "",
    email: "",
    message: "",
    submitError: "",
    recaptchaToken: ""
  };

  setupRecaptcha = (retries = 0) => {
    if (!window.grecaptcha || typeof window.grecaptcha.render !== "function") {
      console.warn("WARN: Couldn't find `recaptcha`. [Retrying... %i]", retries);
      if (retries > MAX_RETRIES)
        return console.error("CRITICAL: FAILED TO LOAD RECAPTCHA", window.grecaptcha);
      return setTimeout(() => this.setupRecaptcha(retries + 1), 200);
    }
    window.grecaptcha.render(this._recaptcha, {
      sitekey: "6LeiiJAUAAAAABLlXbDQOBosXwU5d9me6FWZCQ2x",
      theme: "light", // "dark",
      size: "compact",
      callback: token => {
        this.setState({ recaptchaToken: token });
      }
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleNetworkError = e => {
    this.setState({ submitError: "There was a network error." });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.recaptchaToken) {
      console.warn("Error: No RECAPTCHA token");
      return this.setupRecaptcha(20);
    }
    return fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        "g-recaptcha-response": this.state.recaptchaToken,
        ...this.state
      })
    })
      .then(response => {
        if (response.status > 299) {
          throw new Error("Failed to send message. Please try again.");
        }
        return response.text();
      })
      .then(data => {
        console.log("Form submission success", data);
        navigateTo("/success");
      })
      .catch(error => {
        console.error("Form submission error:", error);
        this.handleNetworkError();
      });
  };

  componentDidMount() {
    this.setupRecaptcha();
  }

  render() {
    const { classes } = this.props;
    const { email, name, message, submitError, recaptchaToken } = this.state;

    return (
      <ValidatorForm
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
        name="contact"
        ref={f => (this.form = f)}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
      >
        {/* <input
          type="hidden"
          name="g-recaptcha-response"
          id="g-recaptcha-response"
          value={recaptchaToken} /> */}

        {submitError && <p className={classes.submitError}>{submitError}</p>}
        <TextValidator
          id="name"
          name="name"
          label="Name"
          value={name}
          onChange={this.handleChange}
          validators={["required"]}
          errorMessages={["this field is required"]}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="email"
          name="email"
          label="E-mail"
          value={email}
          onChange={this.handleChange}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="message"
          name="message"
          label="Message"
          value={message}
          onChange={this.handleChange}
          validators={["required"]}
          errorMessages={["this field is required"]}
          multiline
          fullWidth
          margin="normal"
          className={classes.multilineInput}
        />
        <input name="bot-field" style={{ display: "none" }} />
        <div className={classes.btnBox}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.submit}
          >
            Send
          </Button>
          <div id="recaptcha" className={classes.recaptcha} ref={r => (this._recaptcha = r)} />
        </div>
      </ValidatorForm>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(ContactForm);
