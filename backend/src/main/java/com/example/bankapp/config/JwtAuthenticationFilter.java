package com.example.bankapp.config;

import com.example.bankapp.jwt.JwtUtil;
import com.example.bankapp.model.Account;
import com.example.bankapp.repository.AccountRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AccountRepository accountRepository;


    private String getJwtFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("jwt".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // *** CRITICAL CORRECTION ***
        // For OPTIONS requests (CORS preflight), we must pass the request down the chain
        // so the CORS filter can add the necessary response headers.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response); // <--- THIS IS THE FIX
            return;
        }

        String jwt = getJwtFromCookie(request);
        String username = null;

        if (jwt != null) {
            System.out.println("JWT from Cookie = " + jwt);
            username = jwtUtil.extractUsername(jwt);
            System.out.println("Username from Token = " + username);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Account account = accountRepository.findByUsername(username).orElse(null);
            System.out.println("User in Database = " + account);

            if (account != null && jwtUtil.validateToken(jwt, account.getUsername())) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                account.getUsername(),
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + account.getRole().name()))
                        );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}