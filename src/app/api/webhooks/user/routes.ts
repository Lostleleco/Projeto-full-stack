import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';

const webhookSecret = process.env.WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated';  // Definindo EventType para o tipo do evento

type Event = {
    data: EventDataType;
    object: 'event';
    type: EventType;
};

type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: EmailAddressType[];
    primary_email_address_id: string;
    attributes: Record<string, string | number>;
};

type EmailAddressType = {
    id: string;
    email_address: string;
};

async function handleRequest(request: Request) {
    const payload = await request.json();
    const headersList = headers();
    const heads = {
        'svix-id': (await headersList).get('svix-id'),
        'svix-timestamp': (await headersList).get('svix-timestamp'),
        'svix-signature': (await headersList).get('svix-signature'),
    };

    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;

        if (evt.type === 'user.created' || evt.type === 'user.updated') {
            const {
                id,
                first_name,
                last_name,
                email_addresses,
                primary_email_address_id,
                attributes
            } = evt.data;

            await prisma.user.upsert({
                where: { externalId: id },
                create: {
                    externalId: id,
                    firstName: first_name,
                    lastName: last_name,
                    emailAddresses: email_addresses,
                    primaryEmailAddressId: primary_email_address_id,
                    attributes
                },
                update: {
                    firstName: first_name,
                    lastName: last_name,
                    emailAddresses: email_addresses,
                    primaryEmailAddressId: primary_email_address_id,
                    attributes
                }
            });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
