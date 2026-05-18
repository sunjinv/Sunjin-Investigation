import { motion } from 'motion/react';

export default function Intro() {
  return (
    <section id="about" className="bg-white text-brand-charcoal py-24 lg:py-52 px-10 lg:px-12">
      <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="space-y-12 lg:space-y-12"
        >
          <div className="w-12 lg:w-16 h-[1px] bg-black mx-auto" />
          <h2 className="text-sm lg:text-xl font-light leading-relaxed lg:leading-[2] opacity-80 text-brand-charcoal/80 break-keep mx-auto lg:max-w-[90%]">
            선진 민간수사 그룹은<br />
            철저한 보안과 독보적인 정보력을 바탕으로 움직입니다. <br className="hidden lg:block" />
            귀하의 평온한 일상과 기업의 핵심 가치를 보호하기 위해, <br className="hidden lg:block" />
            사실에 입각한 가장 정확하고 합법적인 솔루션을 제공합니다.
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
