# This class provides a liquid tag that prints a rating with 10 chicken icons.
class ChickenRatingTag < Liquid::Tag
  COLOR_ICON_HTML = '<img src="/assets/icons/chicken.png" alt="Color chicken"' \
                    ' title="Color chicken icon" class="rating-icon" />'.freeze
  BW_ICON_HTML = '<img src="/assets/icons/chicken-bw.png" alt="BW chicken"' \
                 ' title="B/W chicken icon" class="rating-icon" />'.freeze

  def initialize(tag_name, rating, tokens)
    super
    @rating = rating
  end

  def render(context)
    html = ''
    r = context[@rating].to_i
    unless r.nil?
      (1..r).each { html.concat(COLOR_ICON_HTML) }
      (r..9).each { html.concat(BW_ICON_HTML) }
    end
    html
  end

  Liquid::Template.register_tag 'chicken_rating', self
end
