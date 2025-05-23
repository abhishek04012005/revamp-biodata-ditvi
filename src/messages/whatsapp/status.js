const WhatsAppMessageByStatus = [
    {
        status: 1,
        templates: [
            {
                id: 'request_received',
                title: 'Ditvi Biodata - Request Received',
                message: `Dear *$$name$$!* 🎉
                For your Request No: *$$requestNumber$$* and Model No: *$$modelNumber$$*
                Your customized & traditional Ditvi Biodata sample is ready to impress!
                Please check the attached watermarked sample and let us know if it brightens your day!
                Remember—you pay only when you're delighted! 💖
                Thanks for choosing Ditvi Biodata. We're excited for you! 🌟
                Check your real-time status here: $$statusLink$$

                Warm wishes,
                The Ditvi Biodata Team!`
            },
            {
                id: 'request_received_hindi',
                title: 'दित्वी बायोडाटा - अनुरोध प्राप्त',
                message: `प्रिय *$$name$$!* 🎉
                आपका अनुरोध संख्या: *$$requestNumber$$* और मॉडल संख्या: *$$modelNumber$$*
                आपका कस्टमाइज्ड दित्वी बायोडाटा सैंपल तैयार है!
                कृपया वॉटरमार्क सैंपल देखें और हमें बताएं कि यह आपको पसंद आया या नहीं!
                याद रखें - आप केवल तभी भुगतान करें जब आप खुश हों! 💖
                दित्वी बायोडाटा चुनने के लिए धन्यवाद। 🌟
                यहां अपनी स्थिति देखें: $$statusLink$$

                शुभकामनाएं,
                दित्वी बायोडाटा टीम!`
            }
        ]
    },
    {
        status: 2,
        templates: [
            {
                id: 'payment_pending',
                title: 'Ditvi Biodata - Payment Pending',
                message: `Dear *$$name$$!* 🎉
                For your Request No: *$$requestNumber$$* and Model No: *$$modelNumber$$*
                Your customized Ditvi Biodata is ready to impress!
                Please check the attached watermarked sample and let us know if it brightens your day!
                Remember—you pay only when you're delighted! 💖
                Thanks for choosing Ditvi Biodata. We're excited for you! 🌟
                Check your real-time status here: $$statusLink$$
                
                Warm wishes,    
                The Ditvi Biodata Team!`
            }
        ]
    }
];

const getWhatsappMessageByStatus = (statusId, info) => {
    console.log('Generating WhatsApp messages for status:', statusId, 'with info:', info);
    try {
        const statusTemplates = WhatsAppMessageByStatus.find(
            item => item.status === statusId
        )?.templates;

        if (!statusTemplates || statusTemplates.length === 0) {
            throw new Error(`No templates found for status ${statusId}`);
        }

        // Process all templates for the status
        const messages = statusTemplates.map(template => {
            let { title, message } = template;

            // Define replacements
            const replacements = {
                '\\$\\$name\\$\\$': info.name || 'User',
                '\\$\\$requestNumber\\$\\$': info.requestNumber || 'N/A',
                '\\$\\$modelNumber\\$\\$': info.modelNumber || 'N/A',
                '\\$\\$statusLink\\$\\$': info.statusLink || '#'
            };

            // Replace placeholders in message
            Object.entries(replacements).forEach(([placeholder, value]) => {
                const regex = new RegExp(placeholder, 'g');
                message = message.replace(regex, value);
            });

            // Format the message
            const formattedMessage = message
                .split('\n')
                .map(line => line.trim())
                .filter(line => line)
                .join('\n');

            return {
                id: template.id,
                title,
                message: formattedMessage
            };
        });

        return messages;

    } catch (error) {
        console.error('Error generating WhatsApp messages:', error);
        return [{
            id: 'error',
            title: 'Error',
            message: 'Failed to generate messages'
        }];
    }
};

export { getWhatsappMessageByStatus };