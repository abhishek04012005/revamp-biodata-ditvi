const WhatsAppMessageByStatus = [
    {
        status: 1,
        templates: [
            {
                id: 'request_received',
                title: 'Ditvi Biodata - Request Received',
                message: 
                `Dear *$$name$$* 🎉
                For your Request No: *$$requestNumber$$*.
                Your customized & traditional Ditvi Biodata sample is ready to impress!
                Please check the attached watermarked sample and let us know if it enhances your experience!
                *Remember* —You pay only when you're happy! 💖
                Check your real-time status here: $$statusLink$$
                Thanks for choosing Ditvi Biodata. We're excited for you! 🌟
                Warm wishes,
                The Ditvi Biodata Team!`
            }
        ]
    },
    {
        status: 2,
        templates: [
            {
                id: 'approval_pending',
                title: 'Ditvi Biodata - Approval Pending',
                message: 
                `Dear *$$name$$* 🌟
                We hope you're doing great.
                We haven't received your feedback on your Ditvi Biodata sample for Request No: *$$requestNumber$$* yet.
                Have you had a chance to review the watermarked sample?
                We can't wait to hear from you! 💫
                *Remember* —You pay only when you're happy! 💖
                Check your real-time status here: $$statusLink$$
                Warm wishes,
                The Ditvi Biodata Team`
            }
        ]
    },
        {
        status: 3,
        templates: [
            {
                id: 'payment_link',
                title: 'Ditvi Biodata - Payment Link',
                message: 
                `Dear *$$name$$* 🎉
                We are exicted to hear, you loved our Ditvi Biodata for Request No: *$$requestNumber$$*.💝
                To receive your personalized biodata without watermark, please complete the payment using this secure link: $$paymentLink$$
                *Remember* — We're just one step away from your perfect biodata! 💫
                Warm wishes,
                The Ditvi Biodata Team!`
            },
            {
                id: 'payment_followup',
                title: 'Ditvi Biodata - Payment Follow up',
                message: 
                `Dear *$$name$$* 🌟
                We noticed that the payment for your Ditvi Biodata (Request No: *$$requestNumber$$*) is pending.
                To receive your personalized biodata without watermark, please complete the payment here: $$paymentLink$$
                Need assistance? We're here to help! 💝
                Warm wishes,
                The Ditvi Biodata Team!`
            },
        ]
    },
    {
        status: 4,
        templates: [
            {
                id: 'payment_received',
                title: 'Ditvi Biodata - Payment Confirmation',
                message: 
                `Dear *$$name$$* 🎉
                Thank you for your payment of amount ₹ *$$amount$$*  for Request No: *$$requestNumber$$*.
                We're processing your final biodata and will share it shortly.
                Your trust means the world to us! 💖
                Check your real-time status here: $$statusLink$$
                Warm wishes,
                The Ditvi Biodata Team!`
            },
            {
                id: 'share_original',
                title: 'Ditvi Biodata - Original Biodata',
                message: 
                `Dear *$$name$$* 🌟
                Your final Ditvi Biodata for Request No: *$$requestNumber$$* is ready!💖
                We've attached your personalized biodata without watermark.
                We hope it exceeds your expectations! ✨
                Warm wishes,
                The Ditvi Biodata Team!`
            },
        ]
    },
    {
        status: 5,
        templates: [
            {
                id: 'feedback_request',
                title: 'Ditvi Biodata - Feedback Request',
                message: 
                `Dear *$$name$$* 💫
                We hope you're loving your Ditvi Biodata (Request No: *$$requestNumber$$*)💖
                Your feedback would help us serve you better. Please take a moment to share your experience.🌟
                Please share your feedback here: $$feedbackLink$$
                Thank you for choosing Ditvi Biodata!
                Warm wishes,
                The Ditvi Biodata Team!`
            }
        ]
    }
];

const getWhatsappMessageByStatus = (statusId, info) => {
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

            const replacements = {
                '\\$\\$name\\$\\$': info.name.toString().trim() || 'User',
                '\\$\\$requestNumber\\$\\$': info.requestNumber.toString().trim() || 'N/A',
                '\\$\\$modelNumber\\$\\$': info.modelNumber.toString().trim() || 'N/A',
                '\\$\\$statusLink\\$\\$': info.statusLink || '#',
                '\\$\\$paymentLink\\$\\$': info.paymentLink || '#',
                '\\$\\$feedbackLink\\$\\$': info.feedbackLink || '#',
                '\\$\\$amount\\$\\$': info.amount || '#',
                
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