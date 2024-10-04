import { connectMongo } from '@/libs/mongodb';
import { VentureModel } from '@/models/venture.model';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Connect to the MongoDB database
        await connectMongo();

        // Extract the risk category from the query string (e.g., /ventures?category=low-risk)
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        // Define allowed categories
        const allowedCategories = ['very-high-risk', 'high-risk', 'average-risk', 'low-risk', 'very-low-risk'];

        if (!category || !allowedCategories.includes(category)) {
            return NextResponse.json({ message: 'Invalid or missing category' }, { status: 400 });
        }

        // Fetch ventures by category
        const ventures = await VentureModel.find({ riskCategory: category });

        return NextResponse.json({ ventures }, { status: 200 });

    } catch (error) {
        console.error("Error fetching ventures:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
