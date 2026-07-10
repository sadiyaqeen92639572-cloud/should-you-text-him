import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QUIZZES, getQuiz, QUIZ_SITE_URL } from '../../../lib/quizzes'
import QuizEngine from '../../../components/QuizEngine'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return QUIZZES.map((q) => ({ slug: q.slug }))
}

// Picks 4 other quizzes, rotated by the current quiz's index so each page
// links to a different set rather than every page showing the same 4.
function getRelatedQuizzes(currentSlug: string) {
  const others = QUIZZES.filter((q) => q.slug !== currentSlug)
  const offset = QUIZZES.findIndex((q) => q.slug === currentSlug)
  const rotated = [...others.slice(offset), ...others.slice(0, offset)]
  return rotated.slice(0, 4)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const quiz = getQuiz(slug)
  if (!quiz) return {}
  return {
    title: quiz.metaTitle,
    description: quiz.metaDescription,
    alternates: { canonical: `/quiz/${quiz.slug}` },
    openGraph: {
      title: quiz.metaTitle,
      description: quiz.metaDescription,
      url: `${QUIZ_SITE_URL}/quiz/${quiz.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: quiz.metaTitle,
      description: quiz.metaDescription,
    },
  }
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params
  const quiz = getQuiz(slug)
  if (!quiz) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: quiz.title,
        url: `${QUIZ_SITE_URL}/quiz/${quiz.slug}`,
        description: quiz.metaDescription,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: quiz.title,
            acceptedAnswer: {
              '@type': 'Answer',
              text: quiz.faqAnswer,
            },
          },
          ...quiz.questions.map((q) => ({
            '@type': 'Question',
            name: q.text,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.options.map((o) => o.text.replace(/^[^\w]+/, '').trim()).join(' / '),
            },
          })),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Should I Text Him?', item: QUIZ_SITE_URL },
          { '@type': 'ListItem', position: 2, name: quiz.title, item: `${QUIZ_SITE_URL}/quiz/${quiz.slug}` },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:py-8 max-w-4xl mx-auto font-sans bg-[#F4F4F1] text-black">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="w-full bg-[#FFD93D] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        <a
          href="/"
          className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-black/60 hover:text-black mb-3 transition-colors"
        >
          ← Should I Text Him? / Quiz
        </a>
        <div className="inline-block bg-black text-white px-3 py-1 font-extrabold uppercase text-xs tracking-wider border-2 border-black mb-2">
          🔮 DECISION COMPASS v2.6
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black uppercase leading-none mt-1">
          {quiz.title}
        </h1>
        <p className="text-sm font-bold text-black/70 uppercase tracking-wide mt-2">
          {quiz.questions.length} questions. Instant verdict. No therapy needed.
        </p>
      </header>

      {/* Intro */}
      <div className="bg-white border-4 border-black px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
        <p className="font-bold text-sm text-gray-700 leading-relaxed">{quiz.intro}</p>
      </div>

      {/* Quiz engine */}
      <main>
        <QuizEngine quiz={quiz} />
      </main>

      {/* Related Quizzes */}
      <section className="w-full mt-10 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-black text-white px-6 py-3">
          <h2 className="font-black uppercase tracking-widest text-sm">More Quizzes</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {getRelatedQuizzes(quiz.slug).map((related) => (
            <a
              key={related.slug}
              href={`/quiz/${related.slug}`}
              className="border-2 border-black p-3 bg-[#F4F4F1] hover:bg-[#FFD93D] transition-colors font-black uppercase text-xs tracking-wide"
            >
              {related.title}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center mt-12 pt-6 border-t-4 border-black flex flex-col items-center gap-2">
        <span className="text-xs font-extrabold uppercase text-gray-600 tracking-widest">
          No data collected. No judgment. Just pure vibes.
        </span>
        <span className="text-sm font-black uppercase tracking-wider text-black">
          © 2026 ShouldIText
        </span>
      </footer>

    </div>
  )
}
