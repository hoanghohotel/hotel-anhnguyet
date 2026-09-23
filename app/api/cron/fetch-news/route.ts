import { NextRequest, NextResponse } from 'next/server';
import { crawlAndProcessNews, ScrapedArticle } from '@/lib/rss-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/cron/fetch-news
 * Endpoint Cron Job tự động cào và cập nhật tin tức Du lịch & Lưu trú Cà Mau
 * Có thể kích hoạt bởi Vercel Cron, Google Cloud Scheduler, hoặc gọi thủ công qua dashboard.
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET || 'anhnguyet_camau_cron_2026';

    // Xác thực Cron Secret nếu có cấu hình bảo mật
    const isAuthorized = 
      !process.env.CRON_SECRET || 
      secret === expectedSecret || 
      authHeader === `Bearer ${expectedSecret}`;

    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Sai mã bảo mật Cron Secret',
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const forceFresh = searchParams.get('force') === 'true';

    // Thực thi dịch vụ cào tin tức và chèn internal links
    const result = await crawlAndProcessNews({
      limit: isNaN(limit) ? 10 : limit,
      forceFresh,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Hoàn thành tác vụ Cron cào tin du lịch Cà Mau',
        metadata: {
          cronJobName: 'Cà Mau Tourism & Hospitality SEO Crawler',
          targetBrand: 'Nhà hàng & Khách sạn Ánh Nguyệt (207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau)',
          internalLinkDomains: ['https://anhnguyethotel.com.vn'],
          executionTimeMs: result.executionTimeMs,
          timestamp: new Date().toISOString(),
        },
        statistics: {
          feedsScanned: result.totalFeedsScanned,
          articlesExamined: result.totalArticlesExamined,
          matchedCaMauArticles: result.matchedCaMauArticles,
          totalInternalLinksInserted: result.articles.reduce(
            (sum: number, art: ScrapedArticle) => sum + art.internalLinksCount,
            0
          ),
        },
        data: result.articles,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error) {
    console.error('[API Cron fetch-news Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Lỗi thực thi tác vụ Cron cào tin tức',
        details: (error as Error).message,
        executionTimeMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/fetch-news
 * Cho phép các hệ thống webhook hoặc webhook automation (Zapier, n8n, Cloud Pub/Sub) trigger
 */
export async function POST(request: NextRequest) {
  return GET(request);
}
