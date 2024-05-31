const express = require('express');
const router = express.Router();
const axios = require('axios');


const CLIENT_ID = 'xxx'; // Replace with your actual client ID
const CLIENT_SECRET = 'xxx'; // Replace with your actual client secret

// 定义 /xxx 路由
router.get('/callback', async (req, res) => {
        console.log("到达/callback")
        try {
            // 1. 获取github 返回的临时的 code
            const sessionCode = req.query.code;

            // 2. 使用code换取 token
            const result = await axios.post('https://github.com/login/oauth/access_token', {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: sessionCode,
                },
                {
                    headers: {
                        Accept: 'application/json',
                    }
                });


            const accessToken = result.data.access_token;

            console.log(" result.data.access_token " + accessToken)

            // 3. 使用 token , GET 请求到 GitHub API 获取用户信息
            const userResponse = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const authResult = userResponse.data;

            // 假设某某业务为 true
            const hasUserEmailScope = true;

            // 4,  使用 token , 请求 RestApi 获取用户邮箱信息
            const emailResponse = await axios.get('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // 去views ejs 模板
            res.render('oauth2-token-uri', {
                accessToken: result.data.access_token,
                accessTokenData: result.data,
                userResponse: userResponse.data,
                emailResponse: emailResponse.data
            });

        } catch
            (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    }
)
;

module.exports = router;
