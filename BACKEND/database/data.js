const { generateUUID, hashPassword } = require("../services/crypto");
const { faker } = require("@faker-js/faker");

//Funcion para generar usuarios y posts
async function generateUsersAndPosts() {
    const users = [];
    const posts = [];
    const numUsers = Math.floor(Math.random() * 15) + 1;

    for (let i = 0; i < numUsers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const user = {
            id: generateUUID(),
            name: firstName,
            surname1: lastName,
            email: faker.internet.email({
                firstName: firstName,
                lastName: lastName,
            }),
            password: await hashPassword(faker.internet.password()),
            birthDate: faker.date.past({
                years: 30,
            }),
            acceptedTOS: true,
            emailValidated: true,
            profilePicture: faker.image.urlPicsumPhotos(),
            posts: [],
        };

        const numPostsPerUser = Math.floor(Math.random() * 5) + 1;

        for (let j = 0; j < numPostsPerUser; j++) {
            const post = {
                id: generateUUID(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraphs(),
                photo1: faker.image.urlPicsumPhotos(),
                photo2: faker.image.urlPicsumPhotos(),
                photo3: faker.image.urlPicsumPhotos(),
                userId: user.id,
            };
            posts.push(post);
        }

        users.push(user);
    }

    return [users, posts];
}

//Funcion para generar comentarios
function generateComments(post, users) {
    const numComments = Math.floor(Math.random() * 10) + 1;
    const comments = [];

    for (let i = 0; i < numComments; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const comment = {
            id: generateUUID(),
            content: faker.lorem.sentence(),
            userId: user.id,
            postId: post.id,
        };
        comments.push(comment);
    }

    return comments;
}

//Funcion para generar likes
function generateLikes(post, users) {
    const numLikes = Math.floor(Math.random() * users.length) + 1;
    const likes = [];
    const remainingUsers = [...users];

    for (let i = 0; i < numLikes; i++) {
        const userIndex = Math.floor(Math.random() * remainingUsers.length);
        const user = remainingUsers[userIndex];
        remainingUsers.splice(userIndex, 1);

        const like = {
            id: generateUUID(),
            userId: user.id,
            postId: post.id,
        };
        likes.push(like);
    }

    return likes;
}

//Funcion para rellenar la base de datos
async function generateFakeData(pool) {
    const [users, posts] = await generateUsersAndPosts();

    for (const user of users) {
        await pool.execute(
            `
          INSERT INTO users(id,name,surname1,email,password,birthDate,acceptedTOS,emailValidated,profilePicture)
          VALUES(?,?,?,?,?,?,?,?,?)
        `,
            [
                user.id,
                user.name,
                user.surname1,
                user.email,
                user.password,
                user.birthDate,
                user.acceptedTOS,
                user.emailValidated,
                user.profilePicture,
            ]
        );
    }

    for (const post of posts) {
        await pool.execute(
            `
            INSERT INTO posts(id,title,description,photo1,photo2, photo3, userId)
            VALUES(?,?,?,?,?,?,?)
          `,
            [post.id, post.title, post.description, post.photo1, post.photo2, post.photo3, post.userId]
        );

        const comments = generateComments(post, users);

        for (const comment of comments) {
            await pool.execute(
                `
              INSERT INTO post_comments(id,userId,postId,comment)
              VALUES(?,?,?,?)
            `,
                [comment.id, comment.userId, comment.postId, comment.content]
            );
        }

        const likes = generateLikes(post, users);

        for (const like of likes) {
            await pool.execute(
                `
              INSERT INTO post_likes(id,userId,postId)
              VALUES(?,?,?)
            `,
                [like.id, like.userId, like.postId]
            );
        }
    }
}

module.exports = {
    generateFakeData,
};
