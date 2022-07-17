import nodeFetch from 'node-fetch';

(async function () {
    let leaveConversation = null;
    const fetch = (url, init) => {
        leaveConversation = async (basicChannelData) => {
            const leaveChannelUrl = url.replace('/api/client.boot', '/api/conversations.leave');

            const leaveChannelInit = {
                ...init,
                headers: {
                    ...init.headers,
                    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryHXQIABpZC4CEY0Cv",
                },
                "body": `------WebKitFormBoundaryHXQIABpZC4CEY0Cv\r\nContent-Disposition: form-data; name=\"channel\"\r\n\r\n${basicChannelData.id}\r\n------WebKitFormBoundaryHXQIABpZC4CEY0Cv\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n${token}\r\n------WebKitFormBoundaryHXQIABpZC4CEY0Cv\r\nContent-Disposition: form-data; name=\"_x_mode\"\r\n\r\nonline\r\n------WebKitFormBoundaryHXQIABpZC4CEY0Cv\r\nContent-Disposition: form-data; name=\"_x_sonic\"\r\n\r\ntrue\r\n------WebKitFormBoundaryHXQIABpZC4CEY0Cv--\r\n`,
            }

            let res = await nodeFetch(leaveChannelUrl, leaveChannelInit);
            const data = await res.json();

            if (data.ok === true) {
                console.log(`Left channel: ${basicChannelData.name}`)
            }

            return data;
        }


        return nodeFetch(url, init);
    }

    const token = null // ## REPLACE with token
    let clientBootRequest = null // ## REPLACE WITH Node.js Fetch /api/client.boot request

    const isIncidentChanel = (channel) => {
        return channel && channel.name.includes('re-inc-p1');
    }

    const getBasicChannelData = (channel) => {
        return {
            name: channel.name,
            id: channel.id,
        }
    }

    const clientBootRequestData = await clientBootRequest.json();
    const incidentChannelsIds = clientBootRequestData.channels.filter(isIncidentChanel).map(getBasicChannelData)

    // OPTION 1
    // Test with single channel
    leaveConversation(incidentChannelsIds[0]);

    // OPTION 2
    // Leave fist X
    // let x = 20;
    // incidentChannelsIds.filter((_, index) => index < 20).forEach(channel => {
    //     leaveConversation(channel);
    // })

    // OPTION 3
    // Leave ALL
    // incidentChannelsIds.forEach(channel => {
    //     leaveConversation(channel);
    // })
})()

