function globalFeedbackBlip(event, message, success) {
    globalFeedback.innerText = message
    globalFeedback.classList.add("show")
    if (success) {
        globalFeedback.classList.add("bg-success")
    } else {
        globalFeedback.classList.add("bg-error")
    }
    setTimeout(function () {
        globalFeedback.classList.remove("show")
        globalFeedback.classList.remove("bg-error")
        // backup to page before the form
        UTILS.broadcast(event, "globalFeedbackFinished", globalFeedback, { message: message })
    }, 3000)
}

document.addEventListener('deer-updated', event => {
    globalFeedbackBlip(event, `Saving ${event.detail.name ? "'"+event.detail.name + "' " : ""}successful!`, true)
})

/**
 * @module DEER Data Encoding and Exhibition for RERUM (DEER)
 * @author Patrick Cuba <cubap@slu.edu>

 * This code should serve as a basis for developers wishing to
 * use TinyThings as a RERUM proxy for an application for data entry,
 * especially within the Eventities model.
 * @see tiny.rerum.io
 */

// Identify an alternate config location or only overwrite some items below.
import { default as DEER } from './deer-config.js'

// Identify a UTILS package
import { default as UTILS } from 'https://deer.rerum.io/releases/alpha-0.11/deer-utils.js'

// Render is probably needed by all items, but can be removed.
// CDN at https://deer.rerum.io/releases/
import { default as renderer, initializeDeerViews } from 'https://deer.rerum.io/releases/alpha-0.11/deer-render.js'

// Record is only needed for saving or updating items.
// CDN at https://deer.rerum.io/releases/
import { default as record, initializeDeerForms } from 'https://deer.rerum.io/releases/alpha-0.11/deer-record.js'

initializeDeerViews(DEER).then(() => initializeDeerForms(DEER))

// auth
let auth0 = null
const fetchAuthConfig = () => fetch("/auth_config.json")
const configureClient = async () => {
    const response = await fetchAuthConfig()
    const config = await response.json()
  
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId
    })
  }
  window.onload = async () => {
    await configureClient()
    updateUI()
  }
  const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated()
  
    if(!isAuthenticated) {
        login()
    }
  }
  const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.origin
    })
  }
