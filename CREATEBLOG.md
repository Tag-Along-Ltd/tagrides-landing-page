In the dynamic world of startups, creating a sleek and efficient landing page is key to capturing the interest of potential users. Recently, while working on a landing page for our startup, Frexiq, we encountered a challenge when attempting to save form values to SendinBlue without the need for a backend. In this blog post, we'll share our solution to this issue, making the process seamless and user-friendly.

![WIN_Start_GenZ_Light_16x10_en-US-1024x640.webp](https://res.cloudinary.com/prosper-dev/image/upload/v1705845537/landing_page_yj5gcd.jpg)

### The Initial Setup
Our initial setup involved using the SendinBlue API to collect emails. This part was straightforward, and we successfully fetched emails using the following JavaScript code snippet:

```
const waitlistForm = document.querySelector("#my-form");
const emailInput = document.getElementById("email");

waitlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const body = JSON.stringify({
    email: emailInput.value,
  });

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "your-sendinblue-api-key",
    },
    body: body,
  });

  const data = await response.json();

  if (response.ok) {
    // Handle success
  } else {
    // Handle errors
  }
});
```

### The Challenge: Saving Additional Fields
The challenge arose when we needed to save other fields such as first name, last name, phone, and category to SendinBlue without a backend. The initial code only captured the email field, leaving us with the need for a solution.

### The Solution
To address this, SendinBlue provides a simple yet powerful attribute object in the body of the request. This object allows you to include additional fields along with their corresponding values. The structure of the body is as follows:

```
const body = JSON.stringify({
    email: emailField,
    attributes: {
     attribute_1: value_1,
     attribute_2: value_2,
     attribute_3: value_3,
    },
});
```

Here, the attributes object is where you include fields beyond the email. These attributes must match the names configured in your SendinBlue dashboard, providing a straightforward solution to our challenge.

### Implementation in JavaScript
Applying this solution to our JavaScript code, the updated snippet looks like this:

```
const waitlistForm = document.querySelector("#my-form");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const category = document.getElementById("category");

waitlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();

 const body = JSON.stringify({
    email: email.value,
    attributes: {
      FIRSTNAME: firstName.value,
      LASTNAME: lastName.value,
      SMS: phone.value,
      CATEGORY: category.value,
    },
  });

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "your-sendinblue-api-key",
    },
    body: body,
  });

  const data = await response.json();

  if (response.ok) {
    // Implement a toast or success message
    console.log("Message: ", data.message);
  } else {
    // Catch errors and provide user feedback
    console.log("Message: ", data.message);
  }
});
```

### Conclusion
By leveraging the attributes object in the SendinBlue API, we successfully streamlined the process of saving form values without the need for a backend. This solution not only maintains simplicity in our frontend but also ensures a smooth user experience. As you work on your own landing pages or web projects, consider implementing this approach to enhance the efficiency of your form submissions with SendinBlue.




JSON sample to send blog post
```
{
    "title": "Simplifying Form Data Submission to SendinBlue",
    "content": "text content here",
    "thumbnail": "/assets/img/blog/post_1_image.jpg",
    "image": "/assets/img/blog/post_1_image.jpg"
}
```

The url:
- GET ALL POSTS: `http://localhost:3000/api/posts` - GET
- GET SINGLE POST: `http://localhost:3000/api/posts/669e55ce27c35cb6c7053462` - GET
- UPDATE SINGLE POST: `http://localhost:3000/api/posts/669e55ce27c35cb6c7053462` - PUT
- CREATE POST: `http://localhost:3000/api/posts` - POST
- DELETE POST: `http://localhost:3000/api/posts/669e55ce27c35cb6c7053462` - DELETE

Don't forget to add the appropriate id
